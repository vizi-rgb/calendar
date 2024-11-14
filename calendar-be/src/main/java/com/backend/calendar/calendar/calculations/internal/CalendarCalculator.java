package com.backend.calendar.calendar.calculations.internal;

import com.backend.calendar.calendar.calculations.CalendarCalculations;
import com.backend.calendar.event.domain.Event;
import com.backend.calendar.task.domain.Task;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
class CalendarCalculator implements CalendarCalculations<Object> {

    @Override
    public List<Object> calculateEventsForPeriod(List<Event> events, LocalDateTime start, LocalDateTime end) {
        return List.of();
    }

    @Override
    public List<Object> calculateTasksForPeriod(List<Task> tasks, LocalDateTime start, LocalDateTime end) {
        return List.of();
    }
}
