package com.backend.calendar.calendar.io.internal.importing;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.task.domain.CalendarTask;
import lombok.Builder;

import java.util.List;

@Builder
public record EventsTasksCombined(
    List<CalendarEvent> events,
    List<CalendarTask> tasks
) {
}
