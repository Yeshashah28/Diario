using Journal_backend.Dto;
using Journal_backend.Interface;
using Journal_backend.Models;
using Journal_backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Journal_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        private readonly JwtService _jwtService;
        public AuthController(IAuthService service, JwtService jwtService)
        {
            _service = service;
           _jwtService = jwtService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            var result = await _service.Login(login);
            if (result != null)
            {
                var user = new UserDto()
                {
                    Id = result.Id,
                    Name = result.Name,
                    Email = result.Email,
                };
                var token = _jwtService.GenerateToken(user);
                return Ok(new Response() { Result = 1, Data = new { user,token}, Message = "login successful" });
            }
            else
            {
                return BadRequest(new Response() { Result = 0, Data = null, Message = "Wrong Credentials or User doesn't exist"});
            }

        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDto register)
        {
            var result = await _service.Register(register);
            if (result == 1)
            {
                return Ok(new Response() { Result = 1, Data = null, Message = "registered successfully" });
            }
            else if(result==-1)
            {
                return BadRequest(new Response() { Result = 0, Data = null, Message = "User already exists" });
            } 
            else
            {
                return BadRequest(new Response() { Result = 0, Data = null, Message = "Username already exists" });
            }

        }
    }
}
