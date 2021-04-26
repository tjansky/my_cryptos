using System.Collections.Generic;
using System.Threading.Tasks;
using MyCrypto.Core.Models;

namespace MyCrypto.Core.IRepositories
{
    public interface ITransactionRepository
    {
        Task<List<Transaction>> GetTransactionsAsync(int coinId, int userId);
        Task<Transaction> AddTransactionAsync(Transaction transaction);

        Task DeleteTransactionAsync(Transaction transaction);

        Task<Transaction> GetTransactionByIdAsync(int transId);
    }
}