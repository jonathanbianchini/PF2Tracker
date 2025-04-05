// using Microsoft.EntityFrameworkCore;
// using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// builder.Services.AddDbContext<TodoContext>(opt =>
//     opt.UseInMemoryDatabase("TodoList"));

var app = builder.Build();

// app.MapGet("/", () => "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>\n\n</body>\n</html> ");

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
