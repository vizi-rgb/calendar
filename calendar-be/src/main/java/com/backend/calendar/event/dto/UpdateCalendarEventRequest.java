package com.backend.calendar.event.dto;

import com.backend.calendar.event.domain.Day;
import com.backend.calendar.event.domain.Frequency;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.Date;
import java.util.Set;

@Builder
public record UpdateCalendarEventRequest(
    Frequency frequency,

    @PositiveOrZero
    Integer interval,

    Set<Day> daysOfWeek,

    Date endDate,

    @Size(min = 1, max = 100)
    String title,

    @Size(max = 500)
    String description

) {
}
