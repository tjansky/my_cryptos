using System.Collections.Generic;

namespace MyCrypto.Core.Models
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public virtual ICollection<AddedCoin> AddedCoins { get; set; }
    }
}