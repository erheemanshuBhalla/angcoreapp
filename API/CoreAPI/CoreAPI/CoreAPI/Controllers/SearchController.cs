using CoreAPI.DataMethods;
using CoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Project;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreAPI.Controllers
{
    public class SearchViewModel
    {
        public int? categoryid { get; set; }
        public int[]? sizes { get; set; }
        public int[]? colors { get; set; }
        public int min_price{get;set;}
        public int max_price { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        List<Productmodel> _products = new List<Productmodel>();

        public SearchController()
        {
            _products = ProductMethods.add_dummy_product(_products.Count + 1);
        }
        // GET: api/<SearchController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SearchController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        // POST api/<SearchController>
        public List<Productmodel> Post([FromBody] SearchViewModel model)
        {
            var response = _products.Where(x => x.price >= model.min_price && x.price < model.max_price)          
                .ToList();
            if (model.categoryid > 0)
                response=response.Where(x => x.category == model.categoryid).ToList();

            if(model.sizes!=null)
            if (model.sizes.Length > 0) {
                foreach (var size in model.sizes) {
                        response = response.Where(x => x.variants.Any(x => x.size == size)).ToList();
                }
            }
            if (model.colors != null)
                if (model.colors.Length > 0)
            {
                foreach (var color in model.colors)
                {
                    response=response.Where(x => x.variants.Any(x => x.color == color)).ToList();
                }
            }
            return response;
        }

        // PUT api/<SearchController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SearchController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
