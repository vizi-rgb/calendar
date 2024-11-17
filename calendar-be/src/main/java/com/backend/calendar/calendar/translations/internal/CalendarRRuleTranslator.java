package com.backend.calendar.calendar.translations.internal;

import com.backend.calendar.calendar.translations.CalendarRRuleTranslations;
import com.backend.calendar.event.domain.Event;
import net.fortuna.ical4j.model.Recur;
import net.fortuna.ical4j.model.WeekDay;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.Description;
import net.fortuna.ical4j.model.property.RRule;
import net.fortuna.ical4j.transform.recurrence.Frequency;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
class CalendarRRuleTranslator implements CalendarRRuleTranslations {
    @Override
    public VEvent translateToRRuleEvent(Event event) {
        final var vEvent = new VEvent(
            event.getStartDateTime(),
            event.getEndDateTime(),
            event.getTitle()
        );

        final var weekDays = event.getDaysOfWeek()
            .stream()
            .map(WeekDay::getWeekDay)
            .toList();

        final var recur = new Recur.Builder<>()
            .frequency(frequencyToICal4JFrequency(event.getFrequency()))
            .interval(event.getInterval())
            .dayList(weekDays)
            .build();

        final var rrule = new RRule<>(recur);

        vEvent.add(new Description(event.getDescription()));
        vEvent.add(rrule);

        return vEvent;
    }

    @Override
    public List<VEvent> translateToRRuleEvents(List<? extends Event> events) {
        return events.stream()
            .map(this::translateToRRuleEvent)
            .toList();
    }

    private Frequency frequencyToICal4JFrequency(com.backend.calendar.event.domain.Frequency frequency) {
        return switch (frequency) {
            case com.backend.calendar.event.domain.Frequency.WEEKLY -> Frequency.WEEKLY;
            case com.backend.calendar.event.domain.Frequency.MONTHLY -> Frequency.MONTHLY;
            case com.backend.calendar.event.domain.Frequency.YEARLY -> Frequency.YEARLY;
            default -> Frequency.DAILY;
        };
    }
}
