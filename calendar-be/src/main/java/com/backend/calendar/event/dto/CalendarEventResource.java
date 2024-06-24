package com.backend.calendar.event.dto;

import com.backend.calendar.event.domain.Day;
import com.backend.calendar.event.domain.Frequency;
import lombok.Builder;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Builder
public record CalendarEventResource(
    UUID id,
    Frequency frequency,
    Integer interval,
    Set<Day> daysOfWeek,
    Date endDate,
    String title,
    String description
) {
}
