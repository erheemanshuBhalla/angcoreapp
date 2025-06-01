namespace CoreAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Category(int _Id, string _Name) => (Id, Name) = (_Id, _Name);

    }
}
