using Microsoft.AspNetCore.Mvc;
using UniversityManagement.Application.Students.Commands;
using UniversityManagement.Application.Students.DTOs;
using UniversityManagement.Application.Students.Queries;
using UniversityManagement.Application.Students.Services;

namespace UniversityManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class StudentsController(IStudentService studentService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetStudents(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] string? programme,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        UniversityManagement.Domain.Enums.AcademicStatus? academicStatus = null;

        if (!string.IsNullOrWhiteSpace(status))
        {
            if (!Enum.TryParse<
                    UniversityManagement.Domain.Enums.AcademicStatus>(
                    status,
                    true,
                    out var parsedStatus))
            {
                return BadRequest(new
                {
                    message = $"Invalid academic status '{status}'."
                });
            }

            academicStatus = parsedStatus;
        }

        var query = new GetStudentsQuery(
            search,
            academicStatus,
            programme,
            pageNumber,
            pageSize);

        var result = await studentService.GetStudentsAsync(
            query,
            cancellationToken);

        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(StudentDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetStudent(
        Guid id,
        CancellationToken cancellationToken)
    {
        var student = await studentService.GetStudentByIdAsync(
            id,
            cancellationToken);

        if (student is null)
        {
            return NotFound(new
            {
                message = $"Student with ID '{id}' was not found."
            });
        }

        return Ok(student);
    }

    [HttpPost]
    [ProducesResponseType(typeof(StudentDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> CreateStudent(
        [FromBody] CreateStudentCommand command,
        CancellationToken cancellationToken)
    {
        try
        {
            var student = await studentService.CreateStudentAsync(
                command,
                cancellationToken);

            return CreatedAtAction(
                nameof(GetStudent),
                new { id = student.Id },
                student);
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new
            {
                message = exception.Message
            });
        }
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(StudentDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> UpdateStudent(
        Guid id,
        [FromBody] UpdateStudentCommand command,
        CancellationToken cancellationToken)
    {
        try
        {
            var student = await studentService.UpdateStudentAsync(
                id,
                command,
                cancellationToken);

            if (student is null)
            {
                return NotFound(new
                {
                    message = $"Student with ID '{id}' was not found."
                });
            }

            return Ok(student);
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new
            {
                message = exception.Message
            });
        }
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteStudent(
        Guid id,
        CancellationToken cancellationToken)
    {
        var deleted = await studentService.DeleteStudentAsync(
            id,
            cancellationToken);

        if (!deleted)
        {
            return NotFound(new
            {
                message = $"Student with ID '{id}' was not found."
            });
        }

        return NoContent();
    }
}