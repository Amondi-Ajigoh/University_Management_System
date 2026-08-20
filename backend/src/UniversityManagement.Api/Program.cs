using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversityManagement.Api.Middleware;
using UniversityManagement.Application.Interfaces;
using UniversityManagement.Application.Students.Commands;
using UniversityManagement.Application.Students.Services;
using UniversityManagement.Application.Students.Validators;
using UniversityManagement.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException(
        "Connection string 'DefaultConnection' was not found.");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<IApplicationDbContext>(provider =>
    provider.GetRequiredService<ApplicationDbContext>());

builder.Services.AddScoped<IStudentService, StudentService>();

builder.Services.AddScoped<IValidator<CreateStudentCommand>, CreateStudentCommandValidator>();
builder.Services.AddScoped<IValidator<UpdateStudentCommand>, UpdateStudentCommandValidator>();

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/health", () => Results.Ok(new
{
    status = "healthy",
    service = "UniversityManagement.Api"
}));

app.MapGet("/health/db", async (
    ApplicationDbContext dbContext,
    CancellationToken cancellationToken) =>
{
    var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);

    if (!canConnect)
    {
        return Results.Json(
            new
            {
                status = "unhealthy",
                database = "unavailable"
            },
            statusCode: StatusCodes.Status503ServiceUnavailable);
    }

    return Results.Ok(new
    {
        status = "healthy",
        database = "connected"
    });
});

app.Run();

public partial class Program;
