package com.backend.calendar.task.domain;

import com.backend.calendar.calendar.domain.Schedulable;

import java.util.UUID;

public interface Task extends Schedulable {
    boolean isDone();

    UUID getUuid();
}
