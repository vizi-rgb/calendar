package com.backend.calendar.event.service;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import com.backend.calendar.user.domain.User;
import org.springframework.stereotype.Component;

@Component
public class CalendarEventMapper {

    public CalendarEvent mapCreateCalenderEventRequestToCalendarEvent(
        CreateCalendarEventRequest request,
        User user
    ) {
        return CalendarEvent.builder()
            .frequency(request.frequency())
            .interval(request.interval())
            .daysOfWeek(request.daysOfWeek())
            .endDate(request.endDate())
            .title(request.title())
            .description(request.description())
            .user(user)
            .build();
    }
}
