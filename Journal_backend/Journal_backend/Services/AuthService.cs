using Journal_backend.Dto;
using Journal_backend.Interface;
using Journal_backend.Models;

namespace Journal_backend.Services
{
    public class AuthService: IAuthService
    {
        private readonly IAuthRepository _repo;
        public AuthService(IAuthRepository repo)
        {
           _repo = repo;
        }

        public async Task<User> Login(LoginDto login)
        {
            return await _repo.Login(login);
        }

        public async Task<int> Register(RegisterDto register)
        {
            return await _repo.Register(register);
        }
    }
}
