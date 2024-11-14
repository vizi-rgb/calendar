package com.backend.calendar.event.dto;

import com.backend.calendar.event.domain.Frequency;
import com.backend.calendar.util.NullOrNotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.DayOfWeek;
import java.time.ZonedDateTime;
import java.util.Set;

@Builder
public record UpdateCalendarEventRequest(
    Frequency frequency,

    ZonedDateTime startDateTime,
    ZonedDateTime endDateTime,

    @PositiveOrZero
    Integer interval,

    Set<DayOfWeek> daysOfWeek,


    @NullOrNotBlank
    @Size(min = 1, max = 100)
    String title,

    @Size(max = 500)
    String description

) {
}
