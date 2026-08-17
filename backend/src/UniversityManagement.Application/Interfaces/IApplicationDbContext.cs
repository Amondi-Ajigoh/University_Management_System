using Microsoft.EntityFrameworkCore;
using UniversityManagement.Domain.Entities;

namespace UniversityManagement.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Student> Students { get; }

    DbSet<Lecturer> Lecturers { get; }

    DbSet<Department> Departments { get; }

    DbSet<Course> Courses { get; }

    DbSet<Enrollment> Enrollments { get; }

    DbSet<LecturerCourse> LecturerCourses { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
