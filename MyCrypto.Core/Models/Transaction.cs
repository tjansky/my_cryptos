namespace MyCrypto.Core.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int AddedCoinId { get; set; }
        public int Type { get; set; }
        public double Price { get; set; } 
        public double Quantity { get; set; }
        public double Fee { get; set; }
        public double Cost { get; set; }
        public double Earned { get; set; }

        public virtual AddedCoin AddedCoin { get; set; }
    }
}