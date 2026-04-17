using System;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using API.Interfaces;
using API.Extensions;
namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService _tokenService):BaseApiController
{
[HttpPost("register")]
public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
{
if (await EmailExists(registerDTO.Email)) return BadRequest("Email already exists");
    using var hmac = new HMACSHA512();
    var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password));
    var user = new AppUser
    {
        UserName = registerDTO.DisplayName,
        Email = registerDTO.Email,
        Password = hash,
        PasswordSalt = hmac.Key
    };
    context.Users.Add(user);
    await context.SaveChangesAsync();
    var token = _tokenService.CreateToken(user);
    return Ok(user.AsUserDTO(token));
}
[HttpPost("login")]
public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
    {
        var user = await context.Users.SingleOrDefaultAsync(x => x.Email == loginDTO.Email);
        if (user == null) return Unauthorized("Invalid email");
        using var hmac  = new HMACSHA512(user.PasswordSalt);
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
        for(int i =0 ; i<hash.Length; i++)
        {
            if (hash[i] != user.Password[i]) return Unauthorized("Invalid password");
        }
        var token = _tokenService.CreateToken(user);
        return Ok(user.AsUserDTO(token));
    }
private async Task<bool> EmailExists(string Email)
{
    return await context.Users.AnyAsync(x => x.Email == Email.ToLower());    
}
}
