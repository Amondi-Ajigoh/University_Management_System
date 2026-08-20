using FluentValidation;
using Microsoft.EntityFrameworkCore;
using UniversityManagement.Application.Common;
using UniversityManagement.Application.Interfaces;
using UniversityManagement.Application.Students.Commands;
using UniversityManagement.Application.Students.DTOs;
using UniversityManagement.Application.Students.Queries;
using UniversityManagement.Domain.Entities;

namespace UniversityManagement.Application.Students.Services;

public sealed class StudentService(
    IApplicationDbContext context,
    IValidator<CreateStudentCommand> createStudentValidator,
    IValidator<UpdateStudentCommand> updateStudentValidator) : IStudentService
{
    private const int DefaultPageNumber = 1;
    private const int DefaultPageSize = 10;
    private const int MaximumPageSize = 100;

    public async Task<PaginatedResult<StudentDto>> GetStudentsAsync(
        GetStudentsQuery query,
        CancellationToken cancellationToken = default)
    {
        var pageNumber = query.PageNumber < 1
            ? DefaultPageNumber
            : query.PageNumber;

        var pageSize = query.PageSize < 1
            ? DefaultPageSize
            : Math.Min(query.PageSize, MaximumPageSize);

        IQueryable<Student> studentsQuery = context.Students
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();

            studentsQuery = studentsQuery.Where(student =>
                EF.Functions.Like(student.AdmissionNumber, $"%{search}%") ||
                EF.Functions.Like(student.FirstName, $"%{search}%") ||
                EF.Functions.Like(student.LastName, $"%{search}%") ||
                EF.Functions.Like(student.Email, $"%{search}%") ||
                EF.Functions.Like(student.Programme, $"%{search}%"));
        }

        if (query.Status.HasValue)
        {
            studentsQuery = studentsQuery.Where(
                student => student.Status == query.Status.Value);
        }

        if (!string.IsNullOrWhiteSpace(query.Programme))
        {
            var programme = query.Programme.Trim();

            studentsQuery = studentsQuery.Where(
                student => student.Programme == programme);
        }

        var totalCount = await studentsQuery.CountAsync(cancellationToken);

        var totalPages = totalCount == 0
            ? 0
            : (int)Math.Ceiling(totalCount / (double)pageSize);

        var items = await studentsQuery
            .OrderBy(student => student.LastName)
            .ThenBy(student => student.FirstName)
            .ThenBy(student => student.AdmissionNumber)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(student => new StudentDto(
                student.Id,
                student.AdmissionNumber,
                student.FirstName,
                student.LastName,
                string.Concat(student.FirstName, " ", student.LastName),
                student.Email,
                student.PhoneNumber,
                student.Programme,
                student.YearOfStudy,
                student.Status,
                student.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return new PaginatedResult<StudentDto>(
            items,
            pageNumber,
            pageSize,
            totalCount,
            totalPages);
    }

    public async Task<StudentDto?> GetStudentByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var student = await context.Students
            .AsNoTracking()
            .SingleOrDefaultAsync(
                student => student.Id == id,
                cancellationToken);

        return student is null
            ? null
            : MapToDto(student);
    }

    public async Task<StudentDto> CreateStudentAsync(
        CreateStudentCommand command,
        CancellationToken cancellationToken = default)
    {
        await createStudentValidator.ValidateAndThrowAsync(
            command,
            cancellationToken);

        var admissionNumber = command.AdmissionNumber.Trim();
        var email = command.Email.Trim();

        var admissionNumberExists = await context.Students
            .AsNoTracking()
            .AnyAsync(
                student => student.AdmissionNumber == admissionNumber,
                cancellationToken);

        if (admissionNumberExists)
        {
            throw new InvalidOperationException(
                $"A student with admission number '{admissionNumber}' already exists.");
        }

        var emailExists = await context.Students
            .AsNoTracking()
            .AnyAsync(
                student => student.Email == email,
                cancellationToken);

        if (emailExists)
        {
            throw new InvalidOperationException(
                $"A student with email '{email}' already exists.");
        }

        var student = new Student
        {
            AdmissionNumber = admissionNumber,
            FirstName = command.FirstName.Trim(),
            LastName = command.LastName.Trim(),
            Email = email,
            PhoneNumber = command.PhoneNumber.Trim(),
            Programme = command.Programme.Trim(),
            YearOfStudy = command.YearOfStudy
        };

        await context.Students.AddAsync(student, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return MapToDto(student);
    }

    public async Task<StudentDto?> UpdateStudentAsync(
        Guid id,
        UpdateStudentCommand command,
        CancellationToken cancellationToken = default)
    {
        await updateStudentValidator.ValidateAndThrowAsync(
            command,
            cancellationToken);

        var student = await context.Students
            .SingleOrDefaultAsync(
                student => student.Id == id,
                cancellationToken);

        if (student is null)
        {
            return null;
        }

        var email = command.Email.Trim();

        var emailExists = await context.Students
            .AsNoTracking()
            .AnyAsync(
                existingStudent =>
                    existingStudent.Id != id &&
                    existingStudent.Email == email,
                cancellationToken);

        if (emailExists)
        {
            throw new InvalidOperationException(
                $"A student with email '{email}' already exists.");
        }

        student.FirstName = command.FirstName.Trim();
        student.LastName = command.LastName.Trim();
        student.Email = email;
        student.PhoneNumber = command.PhoneNumber.Trim();
        student.Programme = command.Programme.Trim();
        student.YearOfStudy = command.YearOfStudy;
        student.Status = command.Status;

        await context.SaveChangesAsync(cancellationToken);

        return MapToDto(student);
    }

    public async Task<bool> DeleteStudentAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var student = await context.Students
            .SingleOrDefaultAsync(
                student => student.Id == id,
                cancellationToken);

        if (student is null)
        {
            return false;
        }

        context.Students.Remove(student);
        await context.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static StudentDto MapToDto(Student student)
    {
        return new StudentDto(
            student.Id,
            student.AdmissionNumber,
            student.FirstName,
            student.LastName,
            string.Concat(student.FirstName, " ", student.LastName),
            student.Email,
            student.PhoneNumber,
            student.Programme,
            student.YearOfStudy,
            student.Status,
            student.CreatedAtUtc);
    }
}