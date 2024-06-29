package com.backend.calendar.event.dto;

import com.backend.calendar.event.domain.Day;
import com.backend.calendar.event.domain.Frequency;
import com.backend.calendar.util.NullOrNotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Set;

@Builder
public record UpdateCalendarEventRequest(
    Frequency frequency,

    LocalDateTime startDateTime,
    LocalDateTime endDateTime,

    @PositiveOrZero
    Integer interval,

    Set<Day> daysOfWeek,


    @NullOrNotBlank
    @Size(min = 1, max = 100)
    String title,

    @Size(max = 500)
    String description

) {
}
