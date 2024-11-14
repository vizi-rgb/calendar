package com.backend.calendar.event.dto;

import com.backend.calendar.event.domain.Frequency;
import lombok.Builder;

import java.time.ZonedDateTime;

@Builder
public record CreateCalendarEventRequest(
    String title,
    ZonedDateTime startDateTime,
    ZonedDateTime endDateTime,
    Boolean isRepetitive,
    Frequency frequency,
    String description,
    CustomEventFrequency customFrequency
) {
}
