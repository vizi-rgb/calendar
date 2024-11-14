package com.backend.calendar.event.dto;

import lombok.Builder;

import java.time.ZonedDateTime;
import java.util.UUID;

public record SimpleCalendarEventResource(
    UUID id,
    ZonedDateTime startDateTime,
    ZonedDateTime endDateTime,
    String title,
    String description,
    String type
) {

    @Builder
    SimpleCalendarEventResource(
        UUID id,
        ZonedDateTime startDateTime,
        ZonedDateTime endDateTime,
        String title,
        String description
    ) {
        this(id, startDateTime, endDateTime, title, description, "EVENT");
    }
}
