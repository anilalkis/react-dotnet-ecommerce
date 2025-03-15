namespace API.Entities;

    public class Cart
    {
        public int CartId { get; set; }
        public string CustomerId { get; set; }
        public List<CartItem> Items { get; set; } = new List<CartItem>();
        public void AddItem(Product product, int quantity)
        {
            Items.Add(new CartItem { Product = product, Quantity = quantity });
            // if (Items.All(x => x.ProductId != productId))
            // {
            //     Items.Add(new CartItem { ProductId = productId, Quantity = quantity });
            //     return;
            // }

            // Items.First(x => x.ProductId == productId).Quantity += quantity;
        }

        public void DeleteItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(x => x.ProductId == productId);
            if (item is null) return;

            item.Quantity -= quantity;

            if(item.Quantity <= 0)
            {
                Items.Remove(item);
            }
        }
    }

    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public int CartId { get; set; }
        public int Quantity { get; set; }
    }
