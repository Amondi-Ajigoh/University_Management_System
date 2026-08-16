using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UniversityManagement.Domain.Entities;

namespace UniversityManagement.Infrastructure.Persistence;

public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Student> Students => Set<Student>();
    public DbSet<Lecturer> Lecturers => Set<Lecturer>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<Course> Courses => Set<Course>();
    public DbSet<Enrollment> Enrollments => Set<Enrollment>();
    public DbSet<LecturerCourse> LecturerCourses => Set<LecturerCourse>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Student>(entity =>
        {
            entity.HasKey(student => student.Id);

            entity.HasIndex(student => student.AdmissionNumber)
                .IsUnique();

            entity.HasIndex(student => student.Email)
                .IsUnique();

            entity.Property(student => student.AdmissionNumber)
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(student => student.FirstName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(student => student.LastName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(student => student.Email)
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(student => student.PhoneNumber)
                .HasMaxLength(30);

            entity.Property(student => student.Programme)
                .HasMaxLength(200)
                .IsRequired();

            entity.HasIndex(student => student.Status);

            entity.HasIndex(student => student.Programme);
        });

        builder.Entity<Lecturer>(entity =>
        {
            entity.HasKey(lecturer => lecturer.Id);

            entity.HasIndex(lecturer => lecturer.StaffNumber)
                .IsUnique();

            entity.HasIndex(lecturer => lecturer.Email)
                .IsUnique();

            entity.Property(lecturer => lecturer.StaffNumber)
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(lecturer => lecturer.FirstName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(lecturer => lecturer.LastName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(lecturer => lecturer.Email)
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(lecturer => lecturer.PhoneNumber)
                .HasMaxLength(30);

            entity.Property(lecturer => lecturer.AcademicTitle)
                .HasMaxLength(100);

            entity.HasOne(lecturer => lecturer.Department)
                .WithMany(department => department.Lecturers)
                .HasForeignKey(lecturer => lecturer.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<Department>(entity =>
        {
            entity.HasKey(department => department.Id);

            entity.HasIndex(department => department.Code)
                .IsUnique();

            entity.Property(department => department.Code)
                .HasMaxLength(20)
                .IsRequired();

            entity.Property(department => department.Name)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(department => department.Description)
                .HasMaxLength(1000);
        });

        builder.Entity<Course>(entity =>
        {
            entity.HasKey(course => course.Id);

            entity.HasIndex(course => course.Code)
                .IsUnique();

            entity.Property(course => course.Code)
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(course => course.Name)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(course => course.Description)
                .HasMaxLength(1000);

            entity.HasOne(course => course.Department)
                .WithMany(department => department.Courses)
                .HasForeignKey(course => course.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<Enrollment>(entity =>
        {
            entity.HasKey(enrollment => enrollment.Id);

            entity.HasIndex(enrollment => new
            {
                enrollment.StudentId,
                enrollment.CourseId,
                enrollment.AcademicYear,
                enrollment.Semester
            }).IsUnique();

            entity.Property(enrollment => enrollment.AcademicYear)
                .HasMaxLength(20)
                .IsRequired();

            entity.Property(enrollment => enrollment.Semester)
                .HasMaxLength(30)
                .IsRequired();

            entity.Property(enrollment => enrollment.Marks)
                .HasPrecision(5, 2);

            entity.Property(enrollment => enrollment.Grade)
                .HasMaxLength(5);

            entity.HasOne(enrollment => enrollment.Student)
                .WithMany(student => student.Enrollments)
                .HasForeignKey(enrollment => enrollment.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(enrollment => enrollment.Course)
                .WithMany(course => course.Enrollments)
                .HasForeignKey(enrollment => enrollment.CourseId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<LecturerCourse>(entity =>
        {
            entity.HasKey(lecturerCourse => lecturerCourse.Id);

            entity.HasIndex(lecturerCourse => new
            {
                lecturerCourse.LecturerId,
                lecturerCourse.CourseId,
                lecturerCourse.AcademicYear,
                lecturerCourse.Semester
            }).IsUnique();

            entity.Property(lecturerCourse => lecturerCourse.AcademicYear)
                .HasMaxLength(20)
                .IsRequired();

            entity.Property(lecturerCourse => lecturerCourse.Semester)
                .HasMaxLength(30)
                .IsRequired();

            entity.HasOne(lecturerCourse => lecturerCourse.Lecturer)
                .WithMany(lecturer => lecturer.LecturerCourses)
                .HasForeignKey(lecturerCourse => lecturerCourse.LecturerId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(lecturerCourse => lecturerCourse.Course)
                .WithMany(course => course.LecturerCourses)
                .HasForeignKey(lecturerCourse => lecturerCourse.CourseId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
