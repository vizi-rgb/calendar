package com.backend.calendar.event.dto;

import com.backend.calendar.event.domain.Frequency;
import lombok.Builder;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Builder
public record CreateCalendarEventRequest(
    String title,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    ZoneId zoneId,
    Boolean isRepetitive,
    Frequency frequency,
    String description,
    CustomEventFrequency customFrequency
) {
}
