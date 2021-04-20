using System.Collections.Generic;

namespace MyCrypto.Core.Models
{
    public class AddedCoin
    {
        public int Id { get; set; }
        public int AppUserId { get; set; }
        public string CoinNameId { get; set; }  

        public virtual AppUser AppUser { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}