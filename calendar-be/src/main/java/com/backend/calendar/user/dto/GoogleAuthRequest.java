package com.backend.calendar.user.dto;

import jakarta.validation.constraints.NotEmpty;

public record GoogleAuthRequest(
    @NotEmpty
    String idToken
) {
}
