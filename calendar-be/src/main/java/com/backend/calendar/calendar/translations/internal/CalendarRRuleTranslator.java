package com.backend.calendar.calendar.translations.internal;

import com.backend.calendar.calendar.domain.Schedulable;
import com.backend.calendar.calendar.translations.CalendarRRuleTranslations;
import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.domain.Event;
import com.backend.calendar.task.domain.CalendarTask;
import com.backend.calendar.task.domain.Task;
import net.fortuna.ical4j.model.Property;
import net.fortuna.ical4j.model.Recur;
import net.fortuna.ical4j.model.WeekDay;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.component.VToDo;
import net.fortuna.ical4j.model.property.*;
import net.fortuna.ical4j.transform.recurrence.Frequency;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @Override
    public CalendarEvent translateFromRRuleEvent(VEvent event) {
        final var builder = CalendarEvent.builder();
        event.getProperty(Property.UID).ifPresent((uid) -> builder.uuid(UUID.fromString(uid.getValue())));
        event.getProperty(Property.SUMMARY).ifPresent((title) -> builder.title(title.getValue()));
        event.getProperty(Property.DESCRIPTION).ifPresent((description -> builder.description(description.getValue())));
        event.getProperty(Property.DTSTART)
            .ifPresent(dateStart -> {
                final var dStart = new DtStart<LocalDateTime>(dateStart.getValue());
                builder.startDateTime(dStart.getDate());
            });
        event.getProperty(Property.DTEND)
            .ifPresent(dateEnd -> {
                final var dEnd = new DtEnd<LocalDateTime>(dateEnd.getValue());
                builder.endDateTime(dEnd.getDate());
            });
        event.getProperty(Property.TZID).ifPresent(tzId -> builder.zoneId(ZoneId.of(tzId.getValue())));
        event.getProperty(Property.RRULE)
            .ifPresent(rrule -> {
                final var recur = new Recur<LocalDateTime>(rrule.getValue());
                builder.frequency(translateFrequency(recur.getFrequency()));
                builder.interval(recur.getInterval());

                final var daysList = recur.getDayList()
                    .stream()
                    .map(day -> translateWeekDay(day.getDay()))
                    .collect(Collectors.toSet());
                builder.daysOfWeek(daysList);
            });

        return builder.build();
    }

    @Override
    public List<CalendarEvent> translateFromRRuleEvents(List<VEvent> events) {
        return events
            .stream()
            .map(this::translateFromRRuleEvent)
            .toList();
    }

    @Override
    public CalendarTask translateFromRRuleTask(VToDo task) {
        final var builder = CalendarTask.builder();
        task.getProperty(Property.UID).ifPresent((uid) -> builder.uuid(UUID.fromString(uid.getValue())));
        task.getProperty(Property.SUMMARY).ifPresent((title) -> builder.title(title.getValue()));
        task.getProperty(Property.DESCRIPTION).ifPresent((description -> builder.description(description.getValue())));
        task.getProperty(Property.DTSTART)
            .ifPresent(dateStart -> {
                final var dStart = new DtStart<LocalDateTime>(dateStart.getValue());
                builder.startDateTime(dStart.getDate());
            });
        task.getProperty(Property.DTEND)
            .ifPresent(dateEnd -> {
                final var dEnd = new DtEnd<LocalDateTime>(dateEnd.getValue());
                builder.endDateTime(dEnd.getDate());
            });
        task.getProperty(Property.TZID).ifPresent(tzId -> builder.zoneId(ZoneId.of(tzId.getValue())));
        return builder.build();
    }

    @Override
    public List<CalendarTask> translateFromRRuleTasks(List<VToDo> tasks) {
        return tasks
            .stream()
            .map(this::translateFromRRuleTask)
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

    private com.backend.calendar.event.domain.Frequency translateFrequency(Frequency frequency) {
        return switch (frequency) {
            case WEEKLY -> com.backend.calendar.event.domain.Frequency.WEEKLY;
            case MONTHLY -> com.backend.calendar.event.domain.Frequency.MONTHLY;
            case YEARLY -> com.backend.calendar.event.domain.Frequency.YEARLY;
            default -> com.backend.calendar.event.domain.Frequency.DAILY;
        };
    }

    private DayOfWeek translateWeekDay(WeekDay.Day day) {
        return switch (day) {
            case SU -> DayOfWeek.SUNDAY;
            case MO -> DayOfWeek.MONDAY;
            case TU -> DayOfWeek.TUESDAY;
            case WE -> DayOfWeek.WEDNESDAY;
            case TH -> DayOfWeek.THURSDAY;
            case FR -> DayOfWeek.FRIDAY;
            case SA -> DayOfWeek.SATURDAY;
        };
    }
}
