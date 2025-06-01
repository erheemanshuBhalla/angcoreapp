using CoreAPI.DataMethods;
using CoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Reflection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        List<Productmodel> _products = new List<Productmodel>();

        

        public ProductController() {
            _products=ProductMethods.add_dummy_product(_products.Count + 1);
        }
        // GET: api/<ProductController>
        [HttpGet]
        [Authorize]
        public IEnumerable<Productmodel> Get()
        {
            return _products;
        }
       

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var response = _products.Single(x => x.Id == id);
            return Ok(response);
        }

        // POST api/<ProductController>
        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Productmodel model)
        {
            IActionResult response = BadRequest();
            model.Id = _products.Count + 1;
            _products.Add(model);
            response = Ok(new { InsertProductId = model.Id });
            return response;
            

        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        [Authorize]

        public IActionResult Put(int id, [FromBody] Productmodel model)
        {
            IActionResult response = BadRequest();
            if (id ==0)
                return NotFound();

            response = Ok(new { UpdatedProductId = id });
            return response;
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
