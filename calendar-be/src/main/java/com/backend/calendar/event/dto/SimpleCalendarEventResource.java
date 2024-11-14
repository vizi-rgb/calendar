package com.backend.calendar.event.dto;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

public record SimpleCalendarEventResource(
    UUID id,
    LocalDateTime startDateTime,
    LocalDateTime endDateTime,
    String title,
    String description,
    String type
) {

    @Builder
    SimpleCalendarEventResource(
        UUID id,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime,
        String title,
        String description
    ) {
        this(id, startDateTime, endDateTime, title, description, "EVENT");
    }
}
