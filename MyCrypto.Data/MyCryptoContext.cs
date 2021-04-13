using Microsoft.EntityFrameworkCore;
using MyCrypto.Core.Models;

namespace MyCrypto.Data
{
    public class MyCryptoContext : DbContext
    {
        public MyCryptoContext(DbContextOptions<MyCryptoContext> options) : base(options)
        {
        }

        public DbSet<AddedCoin> AddedCoins { get; set; }
    }
}