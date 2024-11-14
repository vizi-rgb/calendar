package com.backend.calendar.event.mapping;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;
import net.fortuna.ical4j.model.Period;

import java.time.ZonedDateTime;

public interface CalendarEventMappingUseCases {
    CalendarEvent toCalendarEvent(CreateCalendarEventRequest createCalendarEventRequest);

    SimpleCalendarEventResource toSimpleCalendarEventResource(CalendarEvent calendarEvent);

    SimpleCalendarEventResource toSimpleCalendarEventResource(Period<ZonedDateTime> period);
}
