using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TerAustralis.Api.Models;
using TerAustralis.Api.Models.DTOs;

namespace TerAustralis.Api.Controllers;

[ApiController]
[Route("api/users")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _users;

    public UsersController(UserManager<ApplicationUser> users) => _users = users;

    // ── GET /api/users/profile ─────────────────────────────────────────────────
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var user = await _users.GetUserAsync(User);
        if (user == null) return Unauthorized();

        return Ok(new UserProfile(
            user.Id, user.Email!, user.DisplayName,
            user.Bio, user.AvatarUrl, user.CreatedAt));
    }

    // ── PUT /api/users/profile ─────────────────────────────────────────────────
    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest req)
    {
        var user = await _users.GetUserAsync(User);
        if (user == null) return Unauthorized();

        if (req.DisplayName is not null) user.DisplayName = req.DisplayName;
        if (req.Bio         is not null) user.Bio         = req.Bio;

        var result = await _users.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });

        return Ok(new UserProfile(
            user.Id, user.Email!, user.DisplayName,
            user.Bio, user.AvatarUrl, user.CreatedAt));
    }

    // ── GET /api/users/{id} (public) ───────────────────────────────────────────
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
        var user = await _users.FindByIdAsync(id);
        if (user == null) return NotFound();

        return Ok(new PublicProfile(user.Id, user.DisplayName, user.AvatarUrl));
    }
}
