using FluentAssertions;
using UniversityManagement.Application.Students.Commands;
using UniversityManagement.Application.Students.Validators;
using UniversityManagement.Domain.Enums;

namespace UniversityManagement.UnitTests.Students.Validators;

public sealed class UpdateStudentCommandValidatorTests
{
    private readonly UpdateStudentCommandValidator _validator = new();

    [Fact]
    public void Validate_WithValidCommand_ShouldSucceed()
    {
        var command = CreateValidCommand();

        var result = _validator.Validate(command);

        result.IsValid.Should().BeTrue();
    }

    [Fact]
    public void Validate_WithEmptyFirstName_ShouldFail()
    {
        var command = CreateValidCommand() with
        {
            FirstName = string.Empty
        };

        var result = _validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should()
            .Contain(error => error.PropertyName == nameof(UpdateStudentCommand.FirstName));
    }

    [Fact]
    public void Validate_WithInvalidEmail_ShouldFail()
    {
        var command = CreateValidCommand() with
        {
            Email = "invalid-email"
        };

        var result = _validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should()
            .Contain(error => error.PropertyName == nameof(UpdateStudentCommand.Email));
    }

    [Fact]
    public void Validate_WithInvalidYearOfStudy_ShouldFail()
    {
        var command = CreateValidCommand() with
        {
            YearOfStudy = 0
        };

        var result = _validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should()
            .Contain(error => error.PropertyName == nameof(UpdateStudentCommand.YearOfStudy));
    }

    private static UpdateStudentCommand CreateValidCommand()
    {
        return new UpdateStudentCommand(
            "Rosalyn",
            "Amondi",
            "rosalyn@example.com",
            "+254700000000",
            "Bachelor of Science in Information Technology",
            2,
            AcademicStatus.Active);
    }
}