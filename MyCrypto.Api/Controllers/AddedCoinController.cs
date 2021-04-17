using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyCrypto.Core.IRepositories;
using MyCrypto.Core.Models;

namespace MyCrypto.Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AddedCoinController : ControllerBase
    {
        private readonly IAddedCoinRepository _addedCoinRepo;
        public AddedCoinController(IAddedCoinRepository addedCoinRepo)
        {
            _addedCoinRepo = addedCoinRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<AddedCoin>>> GetAllAddedCoins()
        {
            return await _addedCoinRepo.GetAddedCoinsAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> InsertAddedCoin([FromBody] AddedCoin addedCoin)
        {
            return await _addedCoinRepo.AddAddedCoinAsync(addedCoin);
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