package com.backend.calendar.calendar.calculations;

import com.backend.calendar.event.domain.Event;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;
import com.backend.calendar.task.domain.Task;

import java.time.ZonedDateTime;
import java.util.List;

public interface CalendarCalculations {
    List<SimpleCalendarEventResource> calculateEventsForPeriod(
        List<? extends Event> events,
        ZonedDateTime start,
        ZonedDateTime end
    );

    <T extends Task> List<SimpleCalendarEventResource> calculateTasksForPeriod(
        List<T> tasks,
        ZonedDateTime start,
        ZonedDateTime end
    );
}
