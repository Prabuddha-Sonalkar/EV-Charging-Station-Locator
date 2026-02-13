
using AdminRole.Data;
using AdminRole.Models;
using AdminRole.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdminRole.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly JwtService _jwt;

        public AuthController(AppDbContext db, JwtService jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _db.Users
                .FirstOrDefaultAsync(x => x.Email == request.Email && x.Status == "ACTIVE");

            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });

            // Plain text password match
            if (user.Password != request.Password)
                return Unauthorized(new { message = "Invalid credentials" });

            // Only Admin role (role_id = 1)
            if (user.RoleId != 1)
                return Unauthorized(new { message = "Not an admin account" });

            var token = _jwt.GenerateToken(user.Email);
            return Ok(new { token });
        }
    }
}
