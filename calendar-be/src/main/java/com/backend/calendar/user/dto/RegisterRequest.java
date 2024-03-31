package com.backend.calendar.user.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @Email
    @NotBlank
    String email,
    @NotBlank
    @Size(min = 2, max = 50)
    String name,
    @NotBlank
    @Size(min = 2, max = 50)
    String surname,
    @NotBlank
    @Size(min = 6, max = 60)
    String password
) {
}
