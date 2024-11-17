package com.backend.calendar.event.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.time.ZoneId;

public record GetCalendarEventsRequest(
    @NotNull LocalDateTime from,
    @NotNull LocalDateTime to,
    @NotNull ZoneId zoneId
) {
}
