using Journal_backend.Dto;
using Journal_backend.Models;
namespace Journal_backend.Interface
{
    public interface IAuthRepository
    {
        Task<User> Login(LoginDto login);
        Task<int> Register(RegisterDto register);
    }
}
