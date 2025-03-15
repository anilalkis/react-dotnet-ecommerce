using API.Entities;

namespace API.Services.CartServices
{
    public interface ICartService
    {
        Task<Cart> GetCartAsync(string customerId);
        Task<bool> AddItemToCartAsync(string customerId,Product Product, int Quantity);
        Task CreateCartAsync(string customerId);
        Task<bool> DeleteItemFromCartAsync(string customerId,int productId, int Quantity);
    }
}