using FluentAssertions;
using UniversityManagement.Application.Students.Commands;
using UniversityManagement.Application.Students.Validators;

namespace UniversityManagement.UnitTests.Students.Validators;

public sealed class CreateStudentCommandValidatorTests
{
    private readonly CreateStudentCommandValidator _validator = new();

    [Fact]
    public void Validate_WithValidCommand_ShouldSucceed()
    {
        var command = CreateValidCommand();

        var result = _validator.Validate(command);

        result.IsValid.Should().BeTrue();
    }

    [Fact]
    public void Validate_WithEmptyAdmissionNumber_ShouldFail()
    {
        var command = CreateValidCommand() with
        {
            AdmissionNumber = string.Empty
        };

        var result = _validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should()
            .Contain(error => error.PropertyName == nameof(CreateStudentCommand.AdmissionNumber));
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
            .Contain(error => error.PropertyName == nameof(CreateStudentCommand.Email));
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
            .Contain(error => error.PropertyName == nameof(CreateStudentCommand.YearOfStudy));
    }

    private static CreateStudentCommand CreateValidCommand()
    {
        return new CreateStudentCommand(
            "ADM-2026-001",
            "Rosalyn",
            "Amondi",
            "rosalyn@example.com",
            "+254700000000",
            "Bachelor of Science in Information Technology",
            1);
    }
}