using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductServices;

public class ProductService : IProductService
{
    private readonly DataContext _context;

    public ProductService(DataContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        var result = await _context.Products.ToListAsync();
        
        return result;
    }

    public async Task<Product> GetByIdAsync(int? id)
    {
        var result = await _context.Products.FindAsync(id);

        return result;
    }
}