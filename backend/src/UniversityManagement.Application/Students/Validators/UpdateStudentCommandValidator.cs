using FluentValidation;
using UniversityManagement.Application.Students.Commands;

namespace UniversityManagement.Application.Students.Validators;

public sealed class UpdateStudentCommandValidator
    : AbstractValidator<UpdateStudentCommand>
{
    public UpdateStudentCommandValidator()
    {
        RuleFor(student => student.FirstName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(student => student.LastName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(student => student.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(255);

        RuleFor(student => student.PhoneNumber)
            .MaximumLength(30);

        RuleFor(student => student.Programme)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(student => student.YearOfStudy)
            .InclusiveBetween(1, 10);

        RuleFor(student => student.Status)
            .IsInEnum();
    }
}