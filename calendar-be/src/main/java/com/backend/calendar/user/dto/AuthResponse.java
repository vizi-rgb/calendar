package com.backend.calendar.user.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record AuthResponse(
    UUID userId,
    String token
) {
}
