using CoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        List<Category> _categories = new List<Category>();

        public ProductCategoryController() {
            _categories.AddRange(new List<Category>
            {
                new Category(1,"Clothing" ),
                new Category(2,"Electronics" ),
                new Category(3,"Beauty" ),
                new Category(4,"Books" ),
                new Category(5,"Furniture" ),
            });
        }
        // GET: api/<ProductCategoryController>
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return _categories;
        }

        // GET api/<ProductCategoryController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ProductCategoryController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProductCategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProductCategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
