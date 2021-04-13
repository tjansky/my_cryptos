using System.Collections.Generic;
using System.Threading.Tasks;
using MyCrypto.Core.Models;

namespace MyCrypto.Core.IRepositories
{
    public interface IAddedCoinRepository
    {
        Task<List<AddedCoin>> GetAddedCoinsAsync();
        Task<int> AddAddedCoinAsync(AddedCoin addedCoin);

        Task DeleteAddedCoinAsync(AddedCoin addedCoin);

        Task<AddedCoin> GetAddedCoinByIdAsync(int coinId);
    }
}