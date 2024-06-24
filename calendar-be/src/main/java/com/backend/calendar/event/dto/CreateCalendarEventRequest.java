package com.backend.calendar.event.dto;

import com.backend.calendar.event.domain.Day;
import com.backend.calendar.event.domain.Frequency;
import jakarta.validation.constraints.*;
import lombok.Builder;

import java.util.Date;
import java.util.Set;

@Builder
public record CreateCalendarEventRequest(
    @NotNull
    Frequency frequency,

    @NotNull
    @PositiveOrZero
    Integer interval,

    @NotNull
    @NotEmpty
    Set<Day> daysOfWeek,

    Date endDate,

    @NotBlank
    @Size(min = 1, max = 100)
    String title,

    @Size(max = 500)
    String description
) {
}
