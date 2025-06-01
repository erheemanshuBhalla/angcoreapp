using CoreAPI.Models;

namespace CoreAPI.DataMethods
{
    public static class ProductMethods
    {

        public static List<Productmodel> add_dummy_product(int id)
        {
            List<Productmodel> _products = new List<Productmodel>();

            Productmodel model = new Productmodel();
            model.Id = id;
            model.name = "LENOVO IdeaPad " + (model.Id * 452).ToString();
            model.price = (_products.Count+1) * 1000;
            model.description = "Product Details";
            model.category = 1;
            model.inStock = true;
            model.imageUrl = "demo_image.jpg";
            model.additionalDetails = new AdditionalDetails { manufacturer = "Lenovo", weight = 1 };
            model.variants = new List<Variant>() {
                new Variant{ color="Red", size="Big", stock=100 },
                new Variant{ color="Small", size="Big", stock=100 },
                new Variant{ color="Green", size="Big", stock=100 }
            };
            model.tags = new List<TTag>()
            {
                new TTag{ Tag="Shopping"  },
                new TTag{ Tag="Electronics"  },
                new TTag{ Tag="Books"  }


            };
            _products.Add(model);
            return _products;
        }
    }
}
