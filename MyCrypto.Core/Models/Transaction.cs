namespace MyCrypto.Core.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int AddedCoinId { get; set; }
        public int Type { get; set; }
        public int Price { get; set; } 
        public int Quantity { get; set; }
        public int Fee { get; set; }
        public int Cost { get; set; }
        public int Earned { get; set; }

        public virtual AddedCoin AddedCoin { get; set; }
    }
}