using API.Data;
using API.Middlewares;
using API.Services.CartServices;
using API.Services.ProductServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors();

builder.Services.AddDbContext<DataContext>(options => {
    var config = builder.Configuration;
    var connectionString = config.GetConnectionString("defaultConnection");

    options.UseSqlite(connectionString);
});

builder.Services.AddScoped<IProductService,ProductService>();
builder.Services.AddScoped<ICartService,CartService>();

var app = builder.Build();

app.UseMiddleware<ExceptionHandling>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("/openapi/v1.json","Demo API");
    });
}

app.UseHttpsRedirection();

app.UseCors(opt => {
    opt.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .WithOrigins("http://localhost:3000");
});

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
