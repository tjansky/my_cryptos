using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCrypto.Api.DTOs;
using MyCrypto.Core.IRepositories;
using MyCrypto.Core.Models;

namespace MyCrypto.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly IAppUserRepository _userRepo;
        private readonly ITransactionRepository _transRepo;
        private readonly IAddedCoinRepository _addedCoinRepo;

        public TransactionsController(IAppUserRepository userRepo, ITransactionRepository transRepo, IAddedCoinRepository addedCoinRepo)
        {
            _userRepo = userRepo;
            _transRepo = transRepo;
            _addedCoinRepo = addedCoinRepo;
        }

        [HttpGet("{coinId}")]
         public async Task<ActionResult<List<TransactionDto>>> GetAllTransactions(string coinId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            AppUser user = await _userRepo.GetUserByName(username);

            AddedCoin addedCoin = await _addedCoinRepo.GetAddedCoinByIdAsync(coinId, user.Id);

            List<Transaction> transactions = await _transRepo.GetTransactionsAsync(addedCoin.Id, user.Id);

            // TODO -  use AUTOMAPPER
            List<TransactionDto> transactionsDto = transactions.Select(x => new TransactionDto{
                Id = x.Id,
                AddedCoinId = x.AddedCoinId,
                Type = x.Type,
                Price = x.Price,
                Quantity = x.Quantity,
                Fee = x.Fee,
                Cost = x.Cost,
                Earned = x.Earned
             }).ToList();
            return transactionsDto;
        }


        [HttpPost]
        public async Task<ActionResult<TransactionDto>> InsertTransaction([FromBody] CreateTransactionIdStringDto newTransData)
        {
            // add validations for valid model

            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepo.GetUserByName(username);

            //get added coin of user with addedCoinNameID
            AddedCoin addedCoin = await _addedCoinRepo.GetAddedCoinByIdAsync(newTransData.AddedCoinId, user.Id);

            Transaction newTrans = new Transaction{
                AddedCoinId = addedCoin.Id,
                Type = newTransData.Type,
                Price = newTransData.Price,
                Quantity = newTransData.Quantity,
                Fee = newTransData.Fee,
                Cost = newTransData.Cost,
                Earned = newTransData.Earned
            };
            Transaction addedTrans =  await _transRepo.AddTransactionAsync(newTrans);
            
            return new TransactionDto{
                Id = addedTrans.Id, 
                AddedCoinId = addedTrans.AddedCoinId,
                Type = addedTrans.Type,
                Price = addedTrans.Price,
                Quantity = addedTrans.Quantity,
                Fee = addedTrans.Fee,
                Cost = addedTrans.Cost,
                Earned = addedTrans.Earned,
                AddedCoinNameId = newTransData.AddedCoinId
            };
        }


        [HttpDelete("{transId}")]
        public async Task<ActionResult<int>> DeleteTransaction(int transId)
        {
            if (transId == 0)
                return BadRequest("Transaction id cannot be null");

            Transaction trans = await _transRepo.GetTransactionByIdAsync(transId);

            if (trans == null)
                return NotFound("Transaction with "+transId+" was not found");

            await _transRepo.DeleteTransactionAsync(trans);

            return Ok(transId);
        }

    }
}