package com.backend.calendar.event.dto;

import org.springframework.data.domain.Pageable;

import java.time.ZonedDateTime;

public record GetCalendarEventsRequest(
    ZonedDateTime from,
    ZonedDateTime to,
    Pageable pageable
) {
}
