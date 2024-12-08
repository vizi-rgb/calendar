package com.backend.calendar.calendar.domain;

import java.time.LocalDateTime;
import java.time.ZoneId;

public interface Schedulable {
    LocalDateTime getStartDateTime();

    LocalDateTime getEndDateTime();

    String getTitle();

    String getDescription();

    ZoneId getZoneId();

}
