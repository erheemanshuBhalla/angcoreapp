using CoreAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CoreAPI.DataMethods
{
    public static class ProductMethods
    {
        static List<Productmodel> _products = new List<Productmodel>();
        public static List<Productmodel> add_dummy_product(int id)
        {
            _products = new List<Productmodel>();
            int counter = 1;
            while(counter <= id+20)
            {
                dummy_product(counter);
                counter++;
            }
         
          
          

            return _products;
        }
        public static void dummy_product(int id)
        {
            Random rnd = new Random();

            Productmodel model = new Productmodel();
            model.Id = id;
            model.name = "LENOVO IdeaPad " + (model.Id * 452).ToString();
            model.price = (_products.Count + 1) * 1000;
            model.description = "Product Details";
            model.category = rnd.Next(1,5);
            model.inStock = true;
            model.imageUrl = "demo_image.jpg";
            model.additionalDetails = new AdditionalDetails { manufacturer = "Lenovo", weight = 1 };
            model.variants = new List<Variant>() {
                new Variant{ color=1, size=1, stock=100},
                new Variant{ color=2, size=2, stock=100 },
                new Variant{ color=3, size=3, stock=100 }
            };
            model.tags = new List<TTag>()
            {
                new TTag{ Tag="Shopping"  },
                new TTag{ Tag="Electronics"  },
                new TTag{ Tag="Books"  }
            };
            _products.Add(model);
        }
    }
}
