package com.backend.calendar.calendar.calculations;

import com.backend.calendar.event.domain.Event;
import com.backend.calendar.task.domain.Task;

import java.time.LocalDateTime;
import java.util.List;

public interface CalendarCalculations<T> {
    List<T> calculateEventsForPeriod(List<Event> events, LocalDateTime start, LocalDateTime end);

    List<T> calculateTasksForPeriod(List<Task> tasks, LocalDateTime start, LocalDateTime end);
}
