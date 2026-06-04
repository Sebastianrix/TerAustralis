using System.ComponentModel.DataAnnotations;

namespace TerAustralis.Api.Models.DTOs;

public record RegisterRequest(
    [Required, EmailAddress] string Email,
    [Required, MinLength(8)] string Password,
    string? DisplayName = null
);

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required]               string Password
);

public record RefreshRequest(
    [Required] string AccessToken,
    [Required] string RefreshToken
);

public record AuthResponse(
    string  AccessToken,
    string  RefreshToken,
    string  UserId,
    string  Email,
    string? DisplayName
);

public record UserProfile(
    string   UserId,
    string   Email,
    string?  DisplayName,
    string?  Bio,
    string?  AvatarUrl,
    DateTime CreatedAt
);

public record UpdateProfileRequest(
    string? DisplayName,
    string? Bio
);

public record PublicProfile(
    string  UserId,
    string? DisplayName,
    string? AvatarUrl
);
