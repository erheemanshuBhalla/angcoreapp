
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
            while (counter <= id + 20)
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
            model.category = rnd.Next(1, 5);
            model.inStock = true;
            model.imageUrl = "demo_image.jpg";
            model.additionalDetails = new AdditionalDetails { manufacturer = "Lenovo", weight = rnd.Next(1, 5).ToString() + " KG" };
            model.variants = new List<Variant>() {
                new Variant{ color="Red", size="Big", stock=rnd.Next(1,100)},
                new Variant{ color="Green", size="Large", stock=rnd.Next(1,100) },
                new Variant{ color="Yellow", size="Small", stock=rnd.Next(1,100) }
            };
            model.sale_count = rnd.Next(1, 1000);
            model.isfeatured = id % 5 == 0 ? true : false;
            model.OnSale = id % 3 == 0 ? true : false;

            if (id < 4)
                model.variants.Remove(model.variants.Where(x => x.color == "Red").SingleOrDefault());
            else if ((id > 4) && (id < 8))
                model.variants.Remove(model.variants.Where(x => x.color == "Green").SingleOrDefault());
            else
                model.variants.Remove(model.variants.Where(x => x.color == "Yellow").SingleOrDefault());

            if (id < 4)
                model.variants.Remove(model.variants.Where(x => x.size == "Big").SingleOrDefault());
            else if ((id > 4) && (id < 8))
                model.variants.Remove(model.variants.Where(x => x.size == "Large").SingleOrDefault());
            else
                model.variants.Remove(model.variants.Where(x => x.size == "Small").SingleOrDefault());


            model.tags = new List<TTag>()
            {
                (id%2==0?(new TTag{ Tag="Shopping"  }):(new TTag{ Tag="Electronics"  }))

            };
            _products.Add(model);
        }
    }
}
