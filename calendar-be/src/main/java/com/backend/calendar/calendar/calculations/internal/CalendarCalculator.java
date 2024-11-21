package com.backend.calendar.calendar.calculations.internal;

import com.backend.calendar.calendar.calculations.CalendarCalculations;
import com.backend.calendar.calendar.translations.CalendarRRuleTranslations;
import com.backend.calendar.event.domain.Event;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;
import com.backend.calendar.event.mapping.CalendarEventMappingUseCases;
import com.backend.calendar.task.domain.Task;
import lombok.RequiredArgsConstructor;
import net.fortuna.ical4j.model.Period;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
class CalendarCalculator implements CalendarCalculations {
    private final CalendarRRuleTranslations translations;
    private final CalendarEventMappingUseCases eventMappingUseCases;

    @Override
    public List<SimpleCalendarEventResource> calculateEventsForPeriod(List<? extends Event> events, LocalDateTime start, LocalDateTime end) {
        final var period = new Period<>(start, end);

        final var rruleEvents = translations.translateToRRuleEvents(events);
        final var periodList = rruleEvents.stream()
            .flatMap(
                vEvent ->
                    vEvent.<LocalDateTime>calculateRecurrenceSet(period).stream()
            )
            .toList();

        return periodList.stream()
            .map(eventMappingUseCases::toSimpleCalendarEventResource)
            .toList();
    }

    @Override
    public <T extends Task> List<SimpleCalendarEventResource> calculateTasksForPeriod(List<T> tasks, LocalDateTime start, LocalDateTime end) {
        return List.of();
    }

}
