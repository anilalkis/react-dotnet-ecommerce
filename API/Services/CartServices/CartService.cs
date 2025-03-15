using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services.CartServices
{
    public class CartService : ICartService
    {
        private readonly DataContext _context;

        public CartService(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AddItemToCartAsync(string customerId,Product Product, int Quantity)
        {
            var cart = await GetCartAsync(customerId);
            cart.AddItem(Product, Quantity);
            var result = await _context.SaveChangesAsync() > 0;
            return result;

        }

        public async Task CreateCartAsync(string customerId)
        {
            _context.Carts.Add(new Cart { CustomerId = customerId });
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteItemFromCartAsync(string customerId,int productId, int Quantity)
        {
            var cart = await GetCartAsync(customerId);
            cart.DeleteItem(productId, Quantity);
            var result = await _context.SaveChangesAsync() > 0;
            return result;
        }

        public async Task<Cart> GetCartAsync(string customerId)
        {
            var values = await _context.Carts
                                .Include(x => x.Items)
                                .ThenInclude(x => x.Product)
                                .Where(x => x.CustomerId == customerId)
                                .FirstOrDefaultAsync();
            
            return values;
        }


    }
}