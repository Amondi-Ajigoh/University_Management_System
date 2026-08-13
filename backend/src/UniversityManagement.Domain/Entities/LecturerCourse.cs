namespace UniversityManagement.Domain.Entities;

public sealed class LecturerCourse
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid LecturerId { get; set; }

    public Lecturer Lecturer { get; set; } = null!;

    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public string AcademicYear { get; set; } = string.Empty;

    public string Semester { get; set; } = string.Empty;
}