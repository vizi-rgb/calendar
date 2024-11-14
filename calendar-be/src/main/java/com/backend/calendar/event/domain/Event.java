package com.backend.calendar.event.domain;

import java.time.DayOfWeek;
import java.time.ZonedDateTime;
import java.util.Set;

public interface Event {
    ZonedDateTime getStartDateTime();

    ZonedDateTime getEndDateTime();

    Frequency getFrequency();

    Integer getInterval();

    Set<DayOfWeek> getDaysOfWeek();

    String getTitle();

    String getDescription();
}
