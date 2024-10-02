package com.backend.calendar.event.util;

import com.backend.calendar.event.domain.Frequency;
import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import org.springframework.stereotype.Component;

@Component
public class CalendarEventParser {

    public CalendarEventInfo parseCreateCalendarEventRequest(
        CreateCalendarEventRequest request
    ) {
        final var frequency = getFrequency(request);
        final var interval = getInterval(request);

        return CalendarEventInfo.builder()
            .title(request.title())
            .startDateTime(request.startDateTime())
            .endDateTime(request.endDateTime())
            .frequency(frequency)
            .interval(interval)
            .daysOfWeek(request.customFrequency().daysOfWeek())
            .description(request.description())
            .build();
    }

    private Frequency getFrequency(CreateCalendarEventRequest request) {
        if (!request.isRepetitive()) {
            return Frequency.ONETIME;
        }

        if (request.frequency() != Frequency.CUSTOM) {
            return request.frequency();
        }

        return request.customFrequency().frequency();
    }

    private Integer getInterval(CreateCalendarEventRequest request) {
        final var defaultInterval = 1;

        if (!request.isRepetitive() || request.frequency() != Frequency.CUSTOM) {
            return defaultInterval;
        }

        return request.customFrequency().interval();
    }

}
