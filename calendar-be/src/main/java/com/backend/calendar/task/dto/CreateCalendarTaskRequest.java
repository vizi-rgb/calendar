package com.backend.calendar.task.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CreateCalendarTaskRequest(
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,

    @NotBlank
    @Size(min = 1, max = 100)
    String title,

    @Size(max = 500)
    String description,

    @NotNull
    Boolean isWithoutSpecificDate
) {
}
