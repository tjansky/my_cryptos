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

        [HttpGet]
        public async Task<ActionResult<List<AddedCoinsDto>>> GetAllAddedCoins()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepo.GetUserByName(username);

            var addedCoins = await _addedCoinRepo.GetAddedCoinsAsync(user.Id);

            // TODO -  use AUTOMAPPER
            List<AddedCoinsDto> addedCoinsDto = addedCoins.Select(x => new AddedCoinsDto{AppUserId = x.AppUserId, CoinNameId = x.CoinNameId}).ToList();
            return addedCoinsDto;
        }

        [HttpPost]
        public async Task<ActionResult<int>> InsertAddedCoin([FromQuery] string addedCoinId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepo.GetUserByName(username);

            return await _addedCoinRepo.AddAddedCoinAsync(new AddedCoin{CoinNameId = addedCoinId, AppUserId = user.Id});
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAddedCoin(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            AddedCoin addedCoin = await _addedCoinRepo.GetAddedCoinByIdAsync(id);

            if (addedCoin == null)
                return NotFound();

            await _addedCoinRepo.DeleteAddedCoinAsync(addedCoin);

            return NoContent();
        }


    }
}