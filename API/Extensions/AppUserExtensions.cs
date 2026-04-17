using System;
using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class AppUserExtensions
{
    public static UserDTO AsUserDTO(this AppUser user, string token)
    {
        return new UserDTO
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.UserName,
            Token = token
        };
    }
}