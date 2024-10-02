package com.backend.calendar.task.dto;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record CalendarTaskResource(
    UUID id,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    Boolean isDone,
    String title,
    String description
) {
}
