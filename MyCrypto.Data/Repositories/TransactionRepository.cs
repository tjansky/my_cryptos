using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyCrypto.Core.IRepositories;
using MyCrypto.Core.Models;

namespace MyCrypto.Data.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly MyCryptoContext _db;
        public TransactionRepository(MyCryptoContext db)
        {
            _db = db;
        }

        public async Task<int> AddTransactionAsync(Transaction transaction)
        {
            _db.Transactions.Add(transaction);
            return await _db.SaveChangesAsync();
        }

        public async Task DeleteTransactionAsync(Transaction transaction)
        {
            _db.Transactions.Remove(transaction);
            await _db.SaveChangesAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(int transId)
        {
            return await _db.Transactions.FindAsync(transId);
        }

        public async Task<List<Transaction>> GetTransactionsAsync(int coinId, int userId)
        {
            return await _db.Transactions.Where(x => x.AddedCoinId == coinId && x.AddedCoin.AppUserId == userId).ToListAsync();
        }
    }
}