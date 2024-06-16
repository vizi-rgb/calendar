package com.backend.calendar.user.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserResource(
    UUID userId,
    String email,
    String name,
    String surname,
    String pictureUrl
) {
}
