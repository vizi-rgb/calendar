package com.backend.calendar.task.dto;

import com.backend.calendar.util.NullOrNotBlank;
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

    @NullOrNotBlank
    @Size(min = 1, max = 100)
    String title,

    @Size(max = 500)
    String description
) {
}
