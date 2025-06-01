using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace CoreAPI.Models
{
    [ValidateNever]

     public class AdditionalDetails
    {
        public string manufacturer { get; set; }
        public int weight { get; set; }
    }

    public class Productmodel
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int price { get; set; }
        public int category { get; set; }
        public List<TTag> tags { get; set; }
        public bool inStock { get; set; }
        public string imageUrl { get; set; }
        public AdditionalDetails additionalDetails { get; set; }
        public List<Variant> variants { get; set; }
    }
    public class TTag
    {
        public string Tag { get; set; }
        
    }
    public class Variant
    {
        public string color { get; set; }
        public string size { get; set; }
        public int stock { get; set; }
    }



}
