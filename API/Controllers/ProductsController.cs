using API.Entities;
using API.Services.ProductServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var values = await _productService.GetAllAsync();

        return Ok(values);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProducts(int? id)
    {
        if(id == null)
        {
            return NotFound();
        }

        var values = await _productService.GetByIdAsync(id);

        if(values == null)
        {
            return NotFound();
        }

        return Ok(values);
    }
}

