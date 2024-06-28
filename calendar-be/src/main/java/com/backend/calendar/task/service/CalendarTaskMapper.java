package com.backend.calendar.task.service;

import com.backend.calendar.task.domain.CalendarTask;
import com.backend.calendar.task.dto.CalendarTaskResource;
import com.backend.calendar.task.dto.CreateCalendarTaskRequest;
import com.backend.calendar.user.domain.User;
import org.springframework.stereotype.Component;

@Component
public class CalendarTaskMapper {

    public CalendarTask mapCreateCalendarTaskToCalendarTask(
        CreateCalendarTaskRequest request,
        User user
    ) {
        final var minutes = request.estimatedTimeInMinutes() != null ?
            request.estimatedTimeInMinutes() : 0L;
        return CalendarTask.builder()
            .dateTime(request.dateTime())
            .estimatedTimeInMinutes(minutes)
            .title(request.title())
            .description(request.description())
            .user(user)
            .build();
    }

    public CalendarTaskResource mapCalendarTaskToResource(CalendarTask task) {
        return CalendarTaskResource.builder()
            .id(task.getUuid())
            .dateTime(task.getDateTime())
            .estimatedTimeInMinutes(task.getEstimatedTimeInMinutes())
            .isDone(task.isDone())
            .title(task.getTitle())
            .description(task.getDescription())
            .build();
    }
}
