package com.backend.calendar.calendar.io.internal.importing;

import com.backend.calendar.calendar.translations.CalendarRRuleTranslations;
import lombok.RequiredArgsConstructor;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.component.VToDo;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class CalendarImporter implements CalendarImporting {
    private final CalendarRRuleTranslations translations;

    @Override
    public EventsTasksCombined importCalendar(Calendar calendar, String filename) {
        final var rruleEvents = calendar.<VEvent>getComponents(VEvent.VEVENT);
        final var calendarEvents = translations.translateFromRRuleEvents(rruleEvents);

        final var rruleTasks = calendar.<VToDo>getComponents(VEvent.VTODO);
        final var calendarTasks = translations.translateFromRRuleTasks(rruleTasks);

        return EventsTasksCombined.builder()
            .events(calendarEvents)
            .tasks(calendarTasks)
            .build();
    }
}
