namespace UniversityManagement.Application.Students.Commands;

public sealed record CreateStudentCommand(
    string AdmissionNumber,
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string Programme,
    int YearOfStudy);