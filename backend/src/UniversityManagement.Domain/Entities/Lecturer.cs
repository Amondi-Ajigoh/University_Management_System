namespace UniversityManagement.Domain.Entities;

public sealed class Lecturer
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string StaffNumber { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string AcademicTitle { get; set; } = string.Empty;

    public Guid DepartmentId { get; set; }

    public Department Department { get; set; } = null!;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public ICollection<LecturerCourse> LecturerCourses { get; set; } = new List<LecturerCourse>();
}