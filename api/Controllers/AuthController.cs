using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TerAustralis.Api.Models;
using TerAustralis.Api.Models.DTOs;
using TerAustralis.Api.Services;

namespace TerAustralis.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser>   _users;
    private readonly SignInManager<ApplicationUser> _signIn;
    private readonly ITokenService                  _tokens;
    private readonly IConfiguration                 _config;

    public AuthController(
        UserManager<ApplicationUser>   users,
        SignInManager<ApplicationUser> signIn,
        ITokenService                  tokens,
        IConfiguration                 config)
    {
        _users  = users;
        _signIn = signIn;
        _tokens = tokens;
        _config = config;
    }

    // ── POST /api/auth/register ────────────────────────────────────────────────
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest req)
    {
        var user = new ApplicationUser
        {
            UserName    = req.Email,
            Email       = req.Email,
            DisplayName = req.DisplayName ?? req.Email.Split('@')[0],
        };

        var result = await _users.CreateAsync(user, req.Password);
        if (!result.Succeeded)
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });

        var (access, refresh) = await IssueTokens(user);
        return CreatedAtAction(nameof(Me),
            new AuthResponse(access, refresh, user.Id, user.Email!, user.DisplayName));
    }

    // ── POST /api/auth/login ───────────────────────────────────────────────────
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        var user = await _users.FindByEmailAsync(req.Email);
        if (user == null)
            return Unauthorized(new { message = "Invalid credentials." });

        var result = await _signIn.CheckPasswordSignInAsync(user, req.Password, lockoutOnFailure: true);
        if (!result.Succeeded)
        {
            var msg = result.IsLockedOut ? "Account locked. Try again later." : "Invalid credentials.";
            return Unauthorized(new { message = msg });
        }

        var (access, refresh) = await IssueTokens(user);
        return Ok(new AuthResponse(access, refresh, user.Id, user.Email!, user.DisplayName));
    }

    // ── POST /api/auth/refresh ─────────────────────────────────────────────────
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequest req)
    {
        var principal = _tokens.GetPrincipalFromExpiredToken(req.AccessToken);
        var userId    = principal?.FindFirstValue(JwtClaimTypes.Sub)
                     ?? principal?.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Unauthorized(new { message = "Invalid access token." });

        var user = await _users.FindByIdAsync(userId);
        if (user is null
            || user.RefreshToken != req.RefreshToken
            || user.RefreshTokenExpiry < DateTime.UtcNow)
            return Unauthorized(new { message = "Invalid or expired refresh token." });

        var (access, refresh) = await IssueTokens(user);
        return Ok(new AuthResponse(access, refresh, user.Id, user.Email!, user.DisplayName));
    }

    // ── POST /api/auth/revoke (logout) ─────────────────────────────────────────
    [Authorize]
    [HttpPost("revoke")]
    public async Task<IActionResult> Revoke()
    {
        var user = await _users.GetUserAsync(User);
        if (user == null) return Unauthorized();

        user.RefreshToken       = null;
        user.RefreshTokenExpiry = null;
        await _users.UpdateAsync(user);
        return NoContent();
    }

    // ── GET /api/auth/me ───────────────────────────────────────────────────────
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var user = await _users.GetUserAsync(User);
        if (user == null) return Unauthorized();

        return Ok(new UserProfile(
            user.Id, user.Email!, user.DisplayName,
            user.Bio, user.AvatarUrl, user.CreatedAt));
    }

    // ── GET /api/auth/external/{provider} ─────────────────────────────────────
    // Initiates OAuth flow. provider = "Google" | "GitHub"
    [HttpGet("external/{provider}")]
    public IActionResult ExternalLogin(string provider)
    {
        var redirectUrl = Url.Action(nameof(ExternalCallback), "Auth");
        var properties  = _signIn.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        return Challenge(properties, provider);
    }

    // ── GET /api/auth/external/callback ───────────────────────────────────────
    // ASP.NET Identity redirects here after OAuth dance completes.
    [HttpGet("external/callback")]
    public async Task<IActionResult> ExternalCallback(string? remoteError = null)
    {
        var frontendUrl = _config["FrontendUrl"] ?? "http://localhost";
        var errorBase   = $"{frontendUrl}/auth/error";

        if (remoteError != null)
            return Redirect($"{errorBase}?message={Uri.EscapeDataString(remoteError)}");

        var info = await _signIn.GetExternalLoginInfoAsync();
        if (info == null)
            return Redirect($"{errorBase}?message=external_login_failed");

        // Find user by existing login link
        var user = await _users.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

        if (user == null)
        {
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            if (email == null)
                return Redirect($"{errorBase}?message=no_email_from_provider");

            // Try to link to an existing account with same email
            user = await _users.FindByEmailAsync(email);

            if (user == null)
            {
                // New user — create account
                user = new ApplicationUser
                {
                    UserName       = email,
                    Email          = email,
                    EmailConfirmed = true,
                    DisplayName    = info.Principal.FindFirstValue(ClaimTypes.Name)
                                  ?? email.Split('@')[0],
                    AvatarUrl      = info.Principal.FindFirstValue("picture")
                                  ?? info.Principal.FindFirstValue("avatar_url"),
                };

                var createResult = await _users.CreateAsync(user);
                if (!createResult.Succeeded)
                    return Redirect($"{errorBase}?message=account_creation_failed");
            }

            await _users.AddLoginAsync(user, info);
        }

        var (access, refresh) = await IssueTokens(user);

        // Redirect back to React with tokens in query string.
        // The React /auth/callback page reads these and stores them.
        var callbackUrl = $"{frontendUrl}/auth/callback" +
                         $"?token={Uri.EscapeDataString(access)}" +
                         $"&refreshToken={Uri.EscapeDataString(refresh)}";

        return Redirect(callbackUrl);
    }

    // ── Helpers ────────────────────────────────────────────────────────────────
    private async Task<(string access, string refresh)> IssueTokens(ApplicationUser user)
    {
        var access  = _tokens.GenerateAccessToken(user);
        var refresh = _tokens.GenerateRefreshToken();

        user.RefreshToken       = refresh;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        await _users.UpdateAsync(user);

        return (access, refresh);
    }
}

// Avoid System.IdentityModel.Tokens.Jwt namespace conflict
internal static class JwtClaimTypes
{
    internal const string Sub = "sub";
}
