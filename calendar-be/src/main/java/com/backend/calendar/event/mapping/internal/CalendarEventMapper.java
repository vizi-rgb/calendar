package com.backend.calendar.event.mapping.internal;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.dto.CalendarEventResource;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;
import net.fortuna.ical4j.model.Period;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.ZonedDateTime;


@Mapper(componentModel = "spring")
interface CalendarEventMapper {
    CalendarEvent mapCalendarEventInfoToCalendar(CalendarEventInfo info);

    @Mapping(target = "id", source = "uuid")
    CalendarEventResource mapCalendarEventToResource(CalendarEvent event);

    @Mapping(target = "id", source = "uuid")
    SimpleCalendarEventResource mapCalendarEventToSimpleCalendarEventResource(CalendarEvent event);

    @Mapping(target = "startDateTime", source = "start")
    @Mapping(target = "endDateTime", source = "end")
    SimpleCalendarEventResource mapPeriodToSimpleCalendarEventResource(Period<ZonedDateTime> period);
}
