using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyCrypto.Core.IRepositories;
using MyCrypto.Core.Models;

namespace MyCrypto.Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAppUserRepository _userRepo;
        public AccountController(IAppUserRepository userRepo)
        {
            this._userRepo = userRepo;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return BadRequest();

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key
            };

            // save user to db
            await _userRepo.InsertAppUser(user);

            return Ok(user);

        }

    }
}