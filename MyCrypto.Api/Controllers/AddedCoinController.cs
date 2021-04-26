using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyCrypto.Core.IRepositories;
using MyCrypto.Core.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using MyCrypto.Api.DTOs;
using System.Linq;

namespace MyCrypto.Api.Controllers
{

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AddedCoinController : ControllerBase
    {
        private readonly IAddedCoinRepository _addedCoinRepo;
        private readonly IAppUserRepository _userRepo;
        public AddedCoinController(IAddedCoinRepository addedCoinRepo, IAppUserRepository userRepo)
        {
            _addedCoinRepo = addedCoinRepo;
            this._userRepo = userRepo;
        }

        // get all coins user follows
        [HttpGet]
        public async Task<ActionResult<List<AddedCoinsDto>>> GetAllAddedCoins()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepo.GetUserByName(username);

            List<AddedCoin> addedCoins = await _addedCoinRepo.GetAddedCoinsAsync(user.Id);

            // TODO -  use AUTOMAPPER
            List<AddedCoinsDto> addedCoinsDto = addedCoins.Select(x => new AddedCoinsDto{
                AppUserId = x.AppUserId, 
                CoinNameId = x.CoinNameId, 
                Transactions = convertToTransDto(x.Transactions)
                }).ToList();


            return addedCoinsDto;
        }

        // insert coin that user starts following
        [HttpPost]
        public async Task<ActionResult<int>> InsertAddedCoin([FromQuery] string addedCoinId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepo.GetUserByName(username);

            return await _addedCoinRepo.AddAddedCoinAsync(new AddedCoin{CoinNameId = addedCoinId, AppUserId = user.Id});
        }

        // delete coin user follows
        [HttpDelete("{coinId}")]
        public async Task<ActionResult<AddedCoin>> DeleteAddedCoin(string coinId)
        {
            if (string.IsNullOrEmpty(coinId))
                return BadRequest();

            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepo.GetUserByName(username);

            AddedCoin addedCoin = await _addedCoinRepo.GetAddedCoinByIdAsync(coinId, user.Id);

            if (addedCoin == null)
                return NotFound();

            await _addedCoinRepo.DeleteAddedCoinAsync(addedCoin);
            return Ok(addedCoin);
        }


        private List<TransactionDto> convertToTransDto(ICollection<Transaction> transCol){
            List<Transaction> transList = transCol.ToList();

            return transList.Select(x => new TransactionDto{
                AddedCoinId = x.AddedCoinId,
                Type = x.Type,
                Price = x.Price,
                Quantity = x.Quantity,
                Fee = x.Fee,
                Cost = x.Cost,
                Earned = x.Earned,
                Id = x.Id
            }).ToList();
        }

    }
}