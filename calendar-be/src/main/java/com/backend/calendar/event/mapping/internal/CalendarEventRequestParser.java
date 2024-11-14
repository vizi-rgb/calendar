package com.backend.calendar.event.mapping.internal;

import com.backend.calendar.event.domain.Frequency;
import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.util.Collections;
import java.util.List;

@Component
class CalendarEventRequestParser implements CalendarEventRequestParsing {

    @Override
    public CalendarEventInfo parseCreateCalendarEventRequest(
        CreateCalendarEventRequest request
    ) {
        final var frequency = getFrequency(request);
        final var interval = getInterval(request);
        final var daysOfWeek = getDaysOfWeek(request);

        return CalendarEventInfo.builder()
            .title(request.title())
            .startDateTime(request.startDateTime())
            .endDateTime(request.endDateTime())
            .frequency(frequency)
            .interval(interval)
            .daysOfWeek(daysOfWeek)
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

    private List<DayOfWeek> getDaysOfWeek(CreateCalendarEventRequest request) {
        if (!request.isRepetitive() || request.frequency() != Frequency.CUSTOM) {
            return Collections.emptyList();
        }

        if (request.customFrequency() == null) {
            throw new IllegalStateException("Custom frequency cannot be null");
        }

        return request.customFrequency().daysOfWeek();
    }

}
