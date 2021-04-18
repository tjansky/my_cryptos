using MyCrypto.Core.Models;

namespace MyCrypto.Api.Services
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}