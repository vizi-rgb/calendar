package com.backend.calendar.event.mapping.internal;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.dto.CalendarEventResource;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
interface CalendarEventMapper {
    CalendarEvent mapCalendarEventInfoToCalendar(CalendarEventInfo info);

    @Mapping(target = "id", source = "uuid")
    CalendarEventResource mapCalendarEventToResource(CalendarEvent event);

    @Mapping(target = "id", source = "uuid")
    SimpleCalendarEventResource mapCalendarEventToSimpleCalendarEventResource(CalendarEvent event);
}
