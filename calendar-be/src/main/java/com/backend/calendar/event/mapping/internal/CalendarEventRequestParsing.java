package com.backend.calendar.event.mapping.internal;

import com.backend.calendar.event.dto.CreateCalendarEventRequest;

interface CalendarEventRequestParsing {
    CalendarEventInfo parseCreateCalendarEventRequest(CreateCalendarEventRequest request);
}
