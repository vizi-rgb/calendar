package com.backend.calendar.calendar.translations.internal;

import com.backend.calendar.calendar.domain.Schedulable;
import com.backend.calendar.calendar.translations.CalendarRRuleTranslations;
import com.backend.calendar.event.domain.Event;
import com.backend.calendar.task.domain.Task;
import net.fortuna.ical4j.model.Recur;
import net.fortuna.ical4j.model.WeekDay;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.Description;
import net.fortuna.ical4j.model.property.RRule;
import net.fortuna.ical4j.model.property.TzId;
import net.fortuna.ical4j.model.property.Uid;
import net.fortuna.ical4j.transform.recurrence.Frequency;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
class CalendarRRuleTranslator implements CalendarRRuleTranslations {
    @Override
    public VEvent translateToRRuleEvent(Event event) {
        final var vEvent = buildBasicNoRruleEvent(event);

        final var weekDays = event.getDaysOfWeek()
            .stream()
            .map(WeekDay::getWeekDay)
            .toList();

        final var recur = new Recur.Builder<>()
            .frequency(frequencyToICal4JFrequency(event.getFrequency()))
            .interval(event.getInterval())
            .dayList(weekDays);

        if (event.getFrequency() == com.backend.calendar.event.domain.Frequency.ONETIME) {
            recur.count(1);
        }

        final var rrule = new RRule<>(recur.build());

        vEvent.add(rrule);
        vEvent.add(new Uid(event.getUuid().toString()));

        return vEvent;
    }

    @Override
    public List<VEvent> translateToRRuleEvents(List<? extends Event> events) {
        return events.stream()
            .map(this::translateToRRuleEvent)
            .toList();
    }

    @Override
    public VEvent translateToRRuleTask(Task task) {
        final var vEvent = buildBasicNoRruleEvent(task);

        final var recur = new Recur.Builder<>()
            .frequency(Frequency.DAILY)
            .count(1)
            .build();

        final var rrule = new RRule<>(recur);

        vEvent.add(rrule);
        vEvent.add(new Uid(task.getUuid().toString()));

        return vEvent;
    }

    @Override
    public List<VEvent> translateToRRuleTasks(List<? extends Task> tasks) {
        return tasks.stream()
            .map(this::translateToRRuleTask)
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


    private VEvent buildBasicNoRruleEvent(Schedulable schedulable) {
        final var vEvent = new VEvent(
            schedulable.getStartDateTime(),
            schedulable.getEndDateTime(),
            schedulable.getTitle()
        );

        vEvent.add(new Description(schedulable.getDescription()));
        vEvent.add(new TzId(schedulable.getZoneId().toString()));

        return vEvent;

    }
}
