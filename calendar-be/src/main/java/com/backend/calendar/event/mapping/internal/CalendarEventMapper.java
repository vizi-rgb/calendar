package com.backend.calendar.event.mapping.internal;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.dto.CalendarEventResource;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;
import net.fortuna.ical4j.model.Period;
import net.fortuna.ical4j.model.Property;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;


@Mapper(componentModel = "spring")
interface CalendarEventMapper {
    CalendarEvent mapCalendarEventInfoToCalendar(CalendarEventInfo info);

    @Mapping(target = "id", source = "uuid")
    CalendarEventResource mapCalendarEventToResource(CalendarEvent event);

    @Mapping(target = "id", source = "uuid")
    SimpleCalendarEventResource mapCalendarEventToSimpleCalendarEventResource(CalendarEvent event);

    @Mapping(target = "startDateTime", source = "start")
    @Mapping(target = "endDateTime", source = "end")
    @Mapping(target = "zoneId", source = "period")
    @Mapping(target = "id", source = "period")
    @Mapping(target = "title", qualifiedByName = "PeriodToTitle", source = "period")
    @Mapping(target = "description", qualifiedByName = "PeriodToDescription", source = "period")
    SimpleCalendarEventResource mapPeriodToSimpleCalendarEventResource(Period<LocalDateTime> period);

    default ZoneId mapZoneId(Period<LocalDateTime> period) {
        return period.getComponent()
            .getProperty(Property.TZID)
            .map(property -> ZoneId.of(property.getValue()))
            .orElse(ZoneId.of("UTC"));
    }

    default UUID mapUuid(Period<LocalDateTime> period) {
        return period.getComponent()
            .getProperty(Property.UID)
            .map(property -> UUID.fromString(property.getValue()))
            .orElse(null);
    }

    @Named("PeriodToDescription")
    default String mapDescription(Period<LocalDateTime> period) {
        return period.getComponent()
            .getProperty(Property.DESCRIPTION)
            .map(Property::getValue)
            .orElse("");
    }

    @Named("PeriodToTitle")
    default String mapTitle(Period<LocalDateTime> period) {
        return period.getComponent()
            .getProperty(Property.SUMMARY)
            .map(Property::getValue)
            .orElse("");
    }
}
