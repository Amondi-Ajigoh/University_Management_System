using UniversityManagement.Domain.Enums;

namespace UniversityManagement.Application.Students.Commands;

public sealed record UpdateStudentCommand(
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string Programme,
    int YearOfStudy,
    AcademicStatus Status);