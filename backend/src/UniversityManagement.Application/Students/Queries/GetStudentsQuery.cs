using UniversityManagement.Domain.Enums;

namespace UniversityManagement.Application.Students.Queries;

public sealed record GetStudentsQuery(
    string? Search = null,
    AcademicStatus? Status = null,
    string? Programme = null,
    int PageNumber = 1,
    int PageSize = 20);