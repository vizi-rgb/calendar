package com.backend.calendar.event.domain;

import com.backend.calendar.calendar.domain.Schedulable;

import java.time.DayOfWeek;
import java.util.Set;
import java.util.UUID;

public interface Event extends Schedulable {
    Frequency getFrequency();

    Integer getInterval();

    Set<DayOfWeek> getDaysOfWeek();

    UUID getUuid();
}
