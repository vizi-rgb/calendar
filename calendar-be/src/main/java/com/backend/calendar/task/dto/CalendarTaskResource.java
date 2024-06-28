package com.backend.calendar.task.dto;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record CalendarTaskResource(
    UUID id,
    LocalDateTime dateTime,
    Long estimatedTimeInMinutes,
    Boolean isDone,
    String title,
    String description
) {
}
