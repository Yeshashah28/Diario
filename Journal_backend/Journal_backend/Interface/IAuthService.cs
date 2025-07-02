using Journal_backend.Dto;
using Journal_backend.Models;

namespace Journal_backend.Interface
{
    public interface IAuthService
    {
        Task<User> Login(LoginDto login);
        Task<int> Register(RegisterDto register);
    }
}
