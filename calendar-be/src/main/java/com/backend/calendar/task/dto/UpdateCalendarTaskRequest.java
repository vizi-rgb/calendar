package com.backend.calendar.task.dto;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UpdateCalendarTaskRequest(
    LocalDateTime dateTime,

    @Positive
    Long estimatedTimeInMinutes,

    Boolean isDone,

    @Size(min = 1, max = 100)
    String title,

    @Size(max = 500)
    String description
) {
}
