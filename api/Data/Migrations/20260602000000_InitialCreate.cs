using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TerAustralis.Api.Data.Migrations;

public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder m)
    {
        m.CreateTable("AspNetRoles", t => new
        {
            Id               = t.Column<string>("text"),
            Name             = t.Column<string>("character varying(256)", maxLength: 256, nullable: true),
            NormalizedName   = t.Column<string>("character varying(256)", maxLength: 256, nullable: true),
            ConcurrencyStamp = t.Column<string>("text", nullable: true),
        }, constraints: c => c.PrimaryKey("PK_AspNetRoles", x => x.Id));

        m.CreateTable("AspNetUsers", t => new
        {
            Id                   = t.Column<string>("text"),
            DisplayName          = t.Column<string>("character varying(100)", maxLength: 100, nullable: true),
            Bio                  = t.Column<string>("character varying(500)", maxLength: 500, nullable: true),
            AvatarUrl            = t.Column<string>("character varying(500)", maxLength: 500, nullable: true),
            CreatedAt            = t.Column<DateTime>("timestamp with time zone"),
            RefreshToken         = t.Column<string>("text", nullable: true),
            RefreshTokenExpiry   = t.Column<DateTime>("timestamp with time zone", nullable: true),
            UserName             = t.Column<string>("character varying(256)", maxLength: 256, nullable: true),
            NormalizedUserName   = t.Column<string>("character varying(256)", maxLength: 256, nullable: true),
            Email                = t.Column<string>("character varying(256)", maxLength: 256, nullable: true),
            NormalizedEmail      = t.Column<string>("character varying(256)", maxLength: 256, nullable: true),
            EmailConfirmed       = t.Column<bool>("boolean"),
            PasswordHash         = t.Column<string>("text", nullable: true),
            SecurityStamp        = t.Column<string>("text", nullable: true),
            ConcurrencyStamp     = t.Column<string>("text", nullable: true),
            PhoneNumber          = t.Column<string>("text", nullable: true),
            PhoneNumberConfirmed = t.Column<bool>("boolean"),
            TwoFactorEnabled     = t.Column<bool>("boolean"),
            LockoutEnd           = t.Column<DateTimeOffset>("timestamp with time zone", nullable: true),
            LockoutEnabled       = t.Column<bool>("boolean"),
            AccessFailedCount    = t.Column<int>("integer"),
        }, constraints: c => c.PrimaryKey("PK_AspNetUsers", x => x.Id));

        m.CreateTable("AspNetRoleClaims", t => new
        {
            Id         = t.Column<int>("integer").Annotation("Npgsql:ValueGenerationStrategy",
                             Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            RoleId     = t.Column<string>("text"),
            ClaimType  = t.Column<string>("text", nullable: true),
            ClaimValue = t.Column<string>("text", nullable: true),
        }, constraints: c =>
        {
            c.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
            c.ForeignKey("FK_AspNetRoleClaims_AspNetRoles_RoleId", x => x.RoleId, "AspNetRoles", "Id", onDelete: ReferentialAction.Cascade);
        });

        m.CreateTable("AspNetUserClaims", t => new
        {
            Id         = t.Column<int>("integer").Annotation("Npgsql:ValueGenerationStrategy",
                             Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            UserId     = t.Column<string>("text"),
            ClaimType  = t.Column<string>("text", nullable: true),
            ClaimValue = t.Column<string>("text", nullable: true),
        }, constraints: c =>
        {
            c.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
            c.ForeignKey("FK_AspNetUserClaims_AspNetUsers_UserId", x => x.UserId, "AspNetUsers", "Id", onDelete: ReferentialAction.Cascade);
        });

        m.CreateTable("AspNetUserLogins", t => new
        {
            LoginProvider       = t.Column<string>("text"),
            ProviderKey         = t.Column<string>("text"),
            ProviderDisplayName = t.Column<string>("text", nullable: true),
            UserId              = t.Column<string>("text"),
        }, constraints: c =>
        {
            c.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
            c.ForeignKey("FK_AspNetUserLogins_AspNetUsers_UserId", x => x.UserId, "AspNetUsers", "Id", onDelete: ReferentialAction.Cascade);
        });

        m.CreateTable("AspNetUserRoles", t => new
        {
            UserId = t.Column<string>("text"),
            RoleId = t.Column<string>("text"),
        }, constraints: c =>
        {
            c.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
            c.ForeignKey("FK_AspNetUserRoles_AspNetRoles_RoleId", x => x.RoleId, "AspNetRoles", "Id", onDelete: ReferentialAction.Cascade);
            c.ForeignKey("FK_AspNetUserRoles_AspNetUsers_UserId", x => x.UserId, "AspNetUsers", "Id", onDelete: ReferentialAction.Cascade);
        });

        m.CreateTable("AspNetUserTokens", t => new
        {
            UserId        = t.Column<string>("text"),
            LoginProvider = t.Column<string>("text"),
            Name          = t.Column<string>("text"),
            Value         = t.Column<string>("text", nullable: true),
        }, constraints: c =>
        {
            c.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
            c.ForeignKey("FK_AspNetUserTokens_AspNetUsers_UserId", x => x.UserId, "AspNetUsers", "Id", onDelete: ReferentialAction.Cascade);
        });

        // Indexes
        m.CreateIndex("IX_AspNetRoleClaims_RoleId",        "AspNetRoleClaims", "RoleId");
        m.CreateIndex("RoleNameIndex",                     "AspNetRoles",      "NormalizedName", unique: true);
        m.CreateIndex("IX_AspNetUserClaims_UserId",        "AspNetUserClaims", "UserId");
        m.CreateIndex("IX_AspNetUserLogins_UserId",        "AspNetUserLogins", "UserId");
        m.CreateIndex("IX_AspNetUserRoles_RoleId",         "AspNetUserRoles",  "RoleId");
        m.CreateIndex("EmailIndex",                        "AspNetUsers",      "NormalizedEmail");
        m.CreateIndex("UserNameIndex",                     "AspNetUsers",      "NormalizedUserName", unique: true);
    }

    protected override void Down(MigrationBuilder m)
    {
        m.DropTable("AspNetRoleClaims");
        m.DropTable("AspNetUserClaims");
        m.DropTable("AspNetUserLogins");
        m.DropTable("AspNetUserRoles");
        m.DropTable("AspNetUserTokens");
        m.DropTable("AspNetRoles");
        m.DropTable("AspNetUsers");
    }
}
