package com.backend.calendar.task.service;

import com.backend.calendar.task.domain.CalendarTask;
import com.backend.calendar.task.dto.CalendarTaskResource;
import com.backend.calendar.task.dto.CreateCalendarTaskRequest;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CalendarTaskMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "isDone", ignore = true)
    @Mapping(target = "user", ignore = true)
    CalendarTask mapCreateCalendarTaskToCalendarTask(CreateCalendarTaskRequest request);

    @Mapping(target = "id", source = "uuid")
    @Mapping(target = "isDone", ignore = true)
    CalendarTaskResource mapCalendarTaskToResource(CalendarTask task);

    @AfterMapping
    default void checkIfIsWithoutSpecificDate(CreateCalendarTaskRequest request, @MappingTarget CalendarTask task) {
        if (request.isWithoutSpecificDate()) {
            task.setStartDateTime(null);
            task.setEndDateTime(null);
        }
    }
}
