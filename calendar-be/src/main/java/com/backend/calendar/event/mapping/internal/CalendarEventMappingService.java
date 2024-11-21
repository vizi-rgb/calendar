package com.backend.calendar.event.mapping.internal;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;
import com.backend.calendar.event.mapping.CalendarEventMappingUseCases;
import lombok.RequiredArgsConstructor;
import net.fortuna.ical4j.model.Period;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
class CalendarEventMappingService implements CalendarEventMappingUseCases {
    private final CalendarEventRequestParser requestParser;
    private final CalendarEventMapper eventMapper;

    @Override
    public CalendarEvent toCalendarEvent(CreateCalendarEventRequest createCalendarEventRequest) {
        final var parsedEvent = requestParser.parseCreateCalendarEventRequest(createCalendarEventRequest);

        return eventMapper.mapCalendarEventInfoToCalendar(parsedEvent);
    }

    @Override
    public SimpleCalendarEventResource toSimpleCalendarEventResource(CalendarEvent calendarEvent) {
        return eventMapper.mapCalendarEventToSimpleCalendarEventResource(calendarEvent);
    }

    @Override
    public SimpleCalendarEventResource toSimpleCalendarEventResource(Period<LocalDateTime> period) {
        return eventMapper.mapPeriodToSimpleCalendarEventResource(period);
    }
}
