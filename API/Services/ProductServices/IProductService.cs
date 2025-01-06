using API.Entities;

namespace API.Services.ProductServices;

public interface IProductService
{
    Task<List<Product>> GetAllAsync();
    Task<Product> GetByIdAsync(int? id);
}