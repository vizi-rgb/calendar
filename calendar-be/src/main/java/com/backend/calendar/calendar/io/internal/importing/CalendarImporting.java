package com.backend.calendar.calendar.io.internal.importing;

import net.fortuna.ical4j.model.Calendar;

public interface CalendarImporting {
    EventsTasksCombined importCalendar(Calendar calendar, String filename);
}
