package com.backend.calendar.event.mapping.internal;

import com.backend.calendar.event.domain.Frequency;
import lombok.Builder;

import java.time.DayOfWeek;
import java.time.ZonedDateTime;
import java.util.List;

@Builder
public record CalendarEventInfo(
    String title,
    ZonedDateTime startDateTime,
    ZonedDateTime endDateTime,
    Frequency frequency,
    Integer interval,
    List<DayOfWeek> daysOfWeek,
    String description
) {
}
