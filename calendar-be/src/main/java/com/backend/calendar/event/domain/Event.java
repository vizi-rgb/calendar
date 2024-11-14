package com.backend.calendar.event.domain;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.Set;

public interface Event {
    LocalDateTime getStartDateTime();

    LocalDateTime getEndDateTime();

    Frequency getFrequency();

    Integer getInterval();

    Set<DayOfWeek> getDaysOfWeek();

    String getTitle();

    String getDescription();
}
