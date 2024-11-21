package com.backend.calendar.event.mapping.internal;

import com.backend.calendar.event.domain.Frequency;
import lombok.Builder;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Builder
public record CalendarEventInfo(
    String title,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    ZoneId zoneId,
    Frequency frequency,
    Integer interval,
    List<DayOfWeek> daysOfWeek,
    String description
) {
}
