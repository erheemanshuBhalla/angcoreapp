using CoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        // GET: api/<RegisterController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<RegisterController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<RegisterController>
        [HttpPost]
        public IActionResult Post([FromBody] RegisterModel model)
        {
            IActionResult response = Unauthorized();
            if(model.UserName!="")
                response = Ok(new { Status = true });
            
            return response;
        }

        // PUT api/<RegisterController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RegisterController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
