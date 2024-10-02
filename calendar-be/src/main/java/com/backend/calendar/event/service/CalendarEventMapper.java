package com.backend.calendar.event.service;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.dto.CalendarEventResource;
import com.backend.calendar.event.util.CalendarEventInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
interface CalendarEventMapper {
    CalendarEvent mapCalendarEventInfoToCalendar(CalendarEventInfo info);

    @Mapping(target = "id", source = "uuid")
    CalendarEventResource mapCalendarEventToResource(CalendarEvent event);
}
