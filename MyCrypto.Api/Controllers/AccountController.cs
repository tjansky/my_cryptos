using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyCrypto.Api.DTOs;
using MyCrypto.Api.Services;
using MyCrypto.Core.IRepositories;
using MyCrypto.Core.Models;

namespace MyCrypto.Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAppUserRepository _userRepo;
        private readonly ITokenService _tokenService;
        public AccountController(IAppUserRepository userRepo, ITokenService tokenService)
        {
            this._tokenService = tokenService;
            this._userRepo = userRepo;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromQuery] RegisterUserDto registerUser)
        {
            if (string.IsNullOrEmpty(registerUser.Username) || string.IsNullOrEmpty(registerUser.Password))
                return BadRequest();

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerUser.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerUser.Password)),
                PasswordSalt = hmac.Key
            };

            // save user to db
            await _userRepo.InsertAppUser(user);

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromQuery] LoginUserDto loginUser)
        {
            var user = await _userRepo.GetUserByName(loginUser.Username);

            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginUser.Password));

            for (int i = 0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

    }
}