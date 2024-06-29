package com.backend.calendar.event.dto;

import com.backend.calendar.event.domain.Day;
import com.backend.calendar.event.domain.Frequency;
import jakarta.validation.constraints.*;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Set;

@Builder
public record CreateCalendarEventRequest(
    @NotNull
    Frequency frequency,

    @NotNull
    LocalDateTime startDateTime,

    LocalDateTime endDateTime,

    @NotNull
    @PositiveOrZero
    Integer interval,

    @NotNull
    @NotEmpty
    Set<Day> daysOfWeek,


    @NotBlank
    @Size(min = 1, max = 100)
    String title,

    @Size(max = 500)
    String description
) {
}
