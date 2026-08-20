using UniversityManagement.Domain.Enums;

namespace UniversityManagement.Application.Students.DTOs;

public sealed record StudentDto(
    Guid Id,
    string AdmissionNumber,
    string FirstName,
    string LastName,
    string FullName,
    string Email,
    string PhoneNumber,
    string Programme,
    int YearOfStudy,
    AcademicStatus Status,
    DateTime CreatedAtUtc);