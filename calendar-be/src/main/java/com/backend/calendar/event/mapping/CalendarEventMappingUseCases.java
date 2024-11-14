package com.backend.calendar.event.mapping;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;

public interface CalendarEventMappingUseCases {
    CalendarEvent toCalendarEvent(CreateCalendarEventRequest createCalendarEventRequest);

    SimpleCalendarEventResource toSimpleCalendarEventResource(CalendarEvent calendarEvent);
}
