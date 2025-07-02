using Journal_backend.Data;
using Journal_backend.Dto;
using Journal_backend.Interface;
using Journal_backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Journal_backend.Repositories
{
    public class AuthRepository:IAuthRepository
    {
        private readonly AppDbContext _context;
        public AuthRepository(AppDbContext context) {
            _context = context;
        }

        public async Task<User> Login(LoginDto login)
        {
            var userexists = await _context.Users.FirstOrDefaultAsync(x => x.Email == login.Email);
            if (userexists == null || login.Password != userexists.Password)
            {
                return null;
            }
            return userexists;
        }

        public async Task<int> Register(RegisterDto register)
        {
            var userexists= await _context.Users.FirstOrDefaultAsync(x=>x.Email == register.Email);
            var usernameexists = await _context.Users.FirstOrDefaultAsync(x => x.Name == register.Name);
            if (userexists!=null)
            {
                return -1; 
            }
            if (usernameexists != null)
            {
                return -2;
            }
            var newuser= new User()
            {
                Name = register.Name,
                Email = register.Email,
                Password = register.Password,
            };
            _context.Users.Add(newuser);
            await _context.SaveChangesAsync();
            return 1;
        }
    }
}
