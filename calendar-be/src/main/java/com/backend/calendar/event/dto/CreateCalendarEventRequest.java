package com.backend.calendar.event.dto;

import com.backend.calendar.event.domain.Frequency;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CreateCalendarEventRequest(
    String title,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    Boolean isRepetitive,
    Frequency frequency,
    String description,
    CustomEventFrequency customFrequency
) {
}
