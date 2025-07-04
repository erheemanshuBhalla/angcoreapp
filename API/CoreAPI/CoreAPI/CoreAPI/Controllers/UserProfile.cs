using CoreAPI.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfile : ControllerBase
    {
        // GET: api/<UserProfile>
        [HttpGet]
        public Usermodel Get()
        {
            Usermodel model = new Usermodel();
            var accessToken = HttpContext.GetTokenAsync("access_token").Result;
            if (accessToken != null)
            {
                var jwt_token = new JwtSecurityTokenHandler().ReadJwtToken(accessToken.ToString());
                model.Username = jwt_token.Claims.SingleOrDefault(c => c.Type == "name").ToString().Split(":")[1].Trim();
                model.EmailAddress = jwt_token.Claims.SingleOrDefault(c => c.Type == "email").ToString().Split(":")[1].Trim();
            }
            return model;
        }

        // GET api/<UserProfile>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserProfile>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UserProfile>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserProfile>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
