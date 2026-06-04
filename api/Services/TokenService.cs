using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TerAustralis.Api.Models;

namespace TerAustralis.Api.Services;

public interface ITokenService
{
    string          GenerateAccessToken(ApplicationUser user);
    string          GenerateRefreshToken();
    ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
}

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config) => _config = config;

    public string GenerateAccessToken(ApplicationUser user)
    {
        var key    = Encoding.UTF8.GetBytes(_config["Jwt:Secret"]!);
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub,   user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email!),
            new Claim(JwtRegisteredClaimNames.Jti,   Guid.NewGuid().ToString()),
            new Claim("displayName", user.DisplayName ?? ""),
        };

        var token = new JwtSecurityToken(
            issuer:             _config["Jwt:Issuer"],
            audience:           _config["Jwt:Audience"],
            claims:             claims,
            expires:            DateTime.UtcNow.AddMinutes(15),
            signingCredentials: new SigningCredentials(
                new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        var bytes = new byte[64];
        RandomNumberGenerator.Fill(bytes);
        return Convert.ToBase64String(bytes);
    }

    public ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
    {
        var key = Encoding.UTF8.GetBytes(_config["Jwt:Secret"]!);
        var validation = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey        = new SymmetricSecurityKey(key),
            ValidateIssuer          = true,
            ValidIssuer             = _config["Jwt:Issuer"],
            ValidateAudience        = true,
            ValidAudience           = _config["Jwt:Audience"],
            ValidateLifetime        = false, // allow expired — we're issuing a new one
        };

        try
        {
            return new JwtSecurityTokenHandler().ValidateToken(token, validation, out _);
        }
        catch { return null; }
    }
}
