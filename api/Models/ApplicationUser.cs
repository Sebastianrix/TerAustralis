using Microsoft.AspNetCore.Identity;

namespace TerAustralis.Api.Models;

public class ApplicationUser : IdentityUser
{
    public string?   DisplayName         { get; set; }
    public string?   Bio                 { get; set; }
    public string?   AvatarUrl           { get; set; }
    public DateTime  CreatedAt           { get; set; } = DateTime.UtcNow;
    public string?   RefreshToken        { get; set; }
    public DateTime? RefreshTokenExpiry  { get; set; }
}
