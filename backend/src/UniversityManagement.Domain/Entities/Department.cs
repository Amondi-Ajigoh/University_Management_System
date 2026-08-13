namespace UniversityManagement.Domain.Entities;

public sealed class Department
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string Code { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public ICollection<Course> Courses { get; set; } = new List<Course>();

    public ICollection<Lecturer> Lecturers { get; set; } = new List<Lecturer>();
}