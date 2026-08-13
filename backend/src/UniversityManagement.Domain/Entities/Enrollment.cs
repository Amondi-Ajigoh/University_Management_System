namespace UniversityManagement.Domain.Entities;

public sealed class Enrollment
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid StudentId { get; set; }

    public Student Student { get; set; } = null!;

    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public string AcademicYear { get; set; } = string.Empty;

    public string Semester { get; set; } = string.Empty;

    public decimal? Marks { get; set; }

    public string? Grade { get; set; }

    public DateTime EnrolledAtUtc { get; set; } = DateTime.UtcNow;
}