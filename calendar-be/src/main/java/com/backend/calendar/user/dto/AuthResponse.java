package com.backend.calendar.user.dto;

import lombok.Builder;

@Builder
public record AuthResponse(
    String token
) {
}
