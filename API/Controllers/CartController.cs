using API.DTOs;
using API.Entities;
using API.Services.CartServices;
using API.Services.ProductServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;
    private readonly IProductService _productService;

    public CartController(ICartService cartService, IProductService productService)
    {
        _cartService = cartService;
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        var cart = await GetOrCreateCart();
        return Ok(CartToDTO(cart));
    }

    [HttpPost]
    public async Task<ActionResult> AddToCart(int productId, int quantity)
    {
        var customerId = Request.Cookies["customerId"];
        var cart = await GetOrCreateCart();

        var product = await _productService.GetByIdAsync(productId);

        if (product is null) return NotFound("Product not found");

        var result = await _cartService.AddItemToCartAsync(customerId, product, quantity);

        if (result)
        {
            return CreatedAtAction(nameof(GetCart),CartToDTO(cart));
        }
        return BadRequest(new ProblemDetails { Detail = "Product can not adding item to cart" });
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteItemFromCart(int productId,int quantity)
    {
        var customerId = Request.Cookies["customerId"];
        var cart = await GetOrCreateCart();
        var result = await _cartService.DeleteItemFromCartAsync(customerId,productId,quantity);
        if (result)
        {
            return Ok();
        }
        return BadRequest(new ProblemDetails { Detail = "Product can not deleting" });
    }

    private async Task<Cart> GetOrCreateCart()
    {
        var customerId = Request.Cookies["customerId"];
        var cart = await _cartService.GetCartAsync(customerId);

        if (cart is null)
        {
            customerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddMonths(1)
            };
            
            cart = new Cart
            {
                CustomerId = customerId
            };

            Response.Cookies.Append("customerId", customerId, cookieOptions);

            await _cartService.CreateCartAsync(customerId);
        }

        return cart;
    }

    private CartDto CartToDTO(Cart cart){
        return new CartDto
        {
            CartId = cart.CartId,
            CustomerId = cart.CustomerId,
            CartItems = cart.Items.Select(x => new CartItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.ProductName,
                Price = x.Product.Price,
                ImageUrl = x.Product.ImageUrl,
                Quantity = x.Quantity
            }).ToList()
        };
    }
}