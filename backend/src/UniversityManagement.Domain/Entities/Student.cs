using UniversityManagement.Domain.Enums;

namespace UniversityManagement.Domain.Entities;

public sealed class Student
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string AdmissionNumber { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Programme { get; set; } = string.Empty;

    public int YearOfStudy { get; set; }

    public AcademicStatus Status { get; set; } = AcademicStatus.Active;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}