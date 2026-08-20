using UniversityManagement.Application.Common;
using UniversityManagement.Application.Students.Commands;
using UniversityManagement.Application.Students.DTOs;
using UniversityManagement.Application.Students.Queries;

namespace UniversityManagement.Application.Students.Services;

public interface IStudentService
{
    Task<PaginatedResult<StudentDto>> GetStudentsAsync(
        GetStudentsQuery query,
        CancellationToken cancellationToken = default);

    Task<StudentDto?> GetStudentByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task<StudentDto> CreateStudentAsync(
        CreateStudentCommand command,
        CancellationToken cancellationToken = default);

    Task<StudentDto?> UpdateStudentAsync(
        Guid id,
        UpdateStudentCommand command,
        CancellationToken cancellationToken = default);

    Task<bool> DeleteStudentAsync(
        Guid id,
        CancellationToken cancellationToken = default);
}