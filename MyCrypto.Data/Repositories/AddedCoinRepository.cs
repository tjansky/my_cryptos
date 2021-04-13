using System.Collections.Generic;
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

        public async Task<List<AddedCoin>> GetAddedCoinsAsync()
        {
            return await _db.AddedCoins.ToListAsync();
        }
    }
}