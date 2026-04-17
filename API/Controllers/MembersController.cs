using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class MembersController : BaseApiController
    {
        private readonly AppDbContext _context;

        public MembersController(AppDbContext context)
        {
            this._context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<List<AppUser>>> GetUser(string id)
        {
            var user =await _context.Users.FindAsync(id);
            if(user == null) return NotFound();
            return Ok(user);
        }
    }
}
