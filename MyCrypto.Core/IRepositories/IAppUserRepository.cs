using System.Threading.Tasks;
using MyCrypto.Core.Models;

namespace MyCrypto.Core.IRepositories
{
    public interface IAppUserRepository
    {
        Task<AppUser> InsertAppUser(AppUser user);

        Task<AppUser> GetUserByName(string userName);
    }
}