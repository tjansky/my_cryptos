using System.Collections.Generic;
using MyCrypto.Core.Models;

namespace MyCrypto.Api.DTOs
{
    public class AddedCoinsDto
    {
        public int AppUserId { get; set; }
        public string CoinNameId { get; set; }  
        public List<TransactionDto> Transactions { get; set; }

    }
}