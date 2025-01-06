using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions dbContextOptions) : DbContext(dbContextOptions)
{
    public DbSet<Product> Products { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product>{
                new Product { Id = 1, ProductName = "Iphone15", Description="Açıklama", Price=10000, IsActive=true, Stock=10,ImageUrl="1.jpg" },
                new Product { Id = 2, ProductName = "Iphone16", Description="Açıklama", Price=15000, IsActive=true, Stock=10,ImageUrl="2.jpg" },
                new Product { Id = 3, ProductName = "Iphone16 Pro", Description="Açıklama", Price=20000, IsActive=true, Stock=10,ImageUrl="3.jpg" },
                new Product { Id = 4, ProductName = "Iphone16 Pro Max", Description="Açıklama", Price=25000, IsActive=true, Stock=10,ImageUrl="4.jpg" },
            }   
        );
    }
}