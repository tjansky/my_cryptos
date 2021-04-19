using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyCrypto.Core.IRepositories;
using MyCrypto.Core.Models;

namespace MyCrypto.Data.Repositories
{
    public class AddedCoinRepository : IAddedCoinRepository
    {
        private readonly MyCryptoContext _db;
        public AddedCoinRepository(MyCryptoContext db)
        {
            _db = db;
        }

        public async Task<int> AddAddedCoinAsync(AddedCoin addedCoin)
        {
            _db.AddedCoins.Add(addedCoin);
            return await _db.SaveChangesAsync();
        }

        public async Task<List<AddedCoin>> GetAddedCoinsAsync(int userId)
        {
            return await _db.AddedCoins.Where(x => x.AppUserId == userId).ToListAsync();
        }

        public async Task DeleteAddedCoinAsync(AddedCoin addedCoin)
        {
            _db.AddedCoins.Remove(addedCoin);
            await _db.SaveChangesAsync();
        }

        public async Task<AddedCoin> GetAddedCoinByIdAsync(string coinId)
        {
            return await _db.AddedCoins.FirstAsync(x=> x.CoinNameId == coinId);
        }
    }
}