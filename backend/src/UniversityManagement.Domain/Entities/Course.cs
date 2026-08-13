namespace UniversityManagement.Domain.Entities;

public sealed class Course
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string Code { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int CreditHours { get; set; }

    public Guid DepartmentId { get; set; }

    public Department Department { get; set; } = null!;

    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();

    public ICollection<LecturerCourse> LecturerCourses { get; set; } = new List<LecturerCourse>();
}