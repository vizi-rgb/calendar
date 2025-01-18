package com.backend.calendar.calendar.io.internal.exporting;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.task.domain.CalendarTask;
import net.fortuna.ical4j.model.Calendar;

import java.util.List;

public interface CalendarExporting {
    Calendar export(
        List<CalendarEvent> events,
        List<CalendarTask> tasks,
        Boolean shouldAnonymize
    );
}
