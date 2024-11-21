package com.backend.calendar.calendar.calculations;

import com.backend.calendar.event.domain.Event;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;
import com.backend.calendar.task.domain.Task;

import java.time.LocalDateTime;
import java.util.List;

public interface CalendarCalculations {
    List<SimpleCalendarEventResource> calculateEventsForPeriod(
        List<? extends Event> events,
        LocalDateTime start,
        LocalDateTime end
    );

    <T extends Task> List<SimpleCalendarEventResource> calculateTasksForPeriod(
        List<T> tasks,
        LocalDateTime start,
        LocalDateTime end
    );
}
