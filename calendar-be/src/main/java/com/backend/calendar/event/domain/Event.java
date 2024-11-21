package com.backend.calendar.event.domain;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Set;
import java.util.UUID;

public interface Event {
    LocalDateTime getStartDateTime();

    LocalDateTime getEndDateTime();

    Frequency getFrequency();

    Integer getInterval();

    Set<DayOfWeek> getDaysOfWeek();

    String getTitle();

    String getDescription();

    ZoneId getZoneId();

    UUID getUuid();
}
