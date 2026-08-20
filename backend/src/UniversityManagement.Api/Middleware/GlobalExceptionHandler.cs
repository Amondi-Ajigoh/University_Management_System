using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace UniversityManagement.Api.Middleware;

public sealed class GlobalExceptionHandler(
    IProblemDetailsService problemDetailsService,
    ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        logger.LogError(
            exception,
            "An unhandled exception occurred while processing request {Method} {Path}.",
            httpContext.Request.Method,
            httpContext.Request.Path);

        httpContext.Response.StatusCode = exception switch
        {
            ArgumentException => StatusCodes.Status400BadRequest,
            InvalidOperationException => StatusCodes.Status409Conflict,
            _ => StatusCodes.Status500InternalServerError
        };

        var problemDetails = new ProblemDetails
        {
            Status = httpContext.Response.StatusCode,
            Title = exception switch
            {
                ArgumentException => "Invalid request.",
                InvalidOperationException => "Request could not be completed.",
                _ => "An unexpected error occurred."
            },
            Detail = httpContext.Response.StatusCode ==
                     StatusCodes.Status500InternalServerError
                ? "An unexpected server error occurred."
                : exception.Message,
            Instance = httpContext.Request.Path
        };

        return await problemDetailsService.TryWriteAsync(
            new ProblemDetailsContext
            {
                HttpContext = httpContext,
                ProblemDetails = problemDetails
            });
    }
}
