using System.Threading.Tasks;
using MyCrypto.Core.IRepositories;
using MyCrypto.Core.Models;

namespace MyCrypto.Data.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {

        private readonly MyCryptoContext _db;
        public AppUserRepository(MyCryptoContext db)
        {
            _db = db;
        }

        public async Task<AppUser> InsertAppUser(AppUser user)
        {
            _db.AppUsers.Add(user);
            await _db.SaveChangesAsync();

            return user;
        }
    }
}