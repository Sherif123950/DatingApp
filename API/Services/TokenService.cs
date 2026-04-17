using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration configuration) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var secret = configuration["JWT:Secret"] ?? throw new Exception("JWT Secret is not configured");
        if (secret.Length < 64) throw new Exception("JWT Secret must be at least 64 characters long");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id),
        };
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
        };
        var tokenhandler = new JwtSecurityTokenHandler();
        var token = tokenhandler.CreateToken(tokenDescriptor);
        return tokenhandler.WriteToken(token);
    }
}
