using CoreAPI.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var accessToken = HttpContext.GetTokenAsync("access_token").Result;

            var jwt_token = new JwtSecurityTokenHandler().ReadJwtToken(accessToken.ToString());
            var tenantIdClaim = jwt_token.Claims.SingleOrDefault(c => c.Type == "DateOfJoing");
            return Ok();
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] Usermodel login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user.Status == "Success")
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });
            }
            else
            {
                response = Unauthorized();
            }

            return response;
        }
        private string GenerateJSONWebToken(Usermodel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.Username),
                new Claim(JwtRegisteredClaimNames.Email, "mandeep@gmail.com"),
                new Claim(JwtRegisteredClaimNames.Name, userInfo.Username),
                new Claim("DateOfJoing", userInfo.DateofJoining.ToString("yyyy-MM-dd")),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Aud, _config["Jwt:Audience"]),
                new Claim(JwtRegisteredClaimNames.Iss, _config["Jwt:Issuer"])
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: credentials);
           // string returnedtoken = new JwtSecurityTokenHandler().WriteToken(token);
           

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private Usermodel AuthenticateUser(Usermodel login)
        {
            Usermodel user = null;

            //Validate the User Credentials
            //Demo Purpose, I have Passed HardCoded User Information
            if (login.Username.ToLower() == "manideep" && login.Password == "manideep@123")
            {
                user = new Usermodel { Status = "Success", Username = login.Username, EmailAddress = login.EmailAddress, DateofJoining = login.DateofJoining };
            }
            else
            {
                user = new Usermodel { Status = "Login Failed", Username = login.Username, EmailAddress = login.EmailAddress, DateofJoining = login.DateofJoining };
            }
            return user;
        }

    }
}
