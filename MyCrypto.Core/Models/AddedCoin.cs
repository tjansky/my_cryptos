namespace MyCrypto.Core.Models
{
    public class AddedCoin
    {
        public int Id { get; set; }
        public int AppUserId { get; set; }
        public string CoinNameId { get; set; }  

        public virtual AppUser AppUser { get; set; }
    }
}