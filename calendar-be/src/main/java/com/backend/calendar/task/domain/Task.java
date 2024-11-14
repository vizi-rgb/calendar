package com.backend.calendar.task.domain;

import java.time.LocalDateTime;

public interface Task {
    LocalDateTime getStartDateTime();

    LocalDateTime getEndDateTime();

    boolean isDone();

    String getTitle();

    String getDescription();
}
