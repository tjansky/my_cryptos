namespace MyCrypto.Api.DTOs
{
    public class CreateTransactionIdStringDto
    {
        public string AddedCoinId { get; set; }
        public int Type { get; set; }
        public int Price { get; set; } 
        public int Quantity { get; set; }
        public int Fee { get; set; }
        public int Cost { get; set; }
        public int Earned { get; set; }
    }
}