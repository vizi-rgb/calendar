package com.backend.calendar.calendar.io.internal.export;

import com.backend.calendar.calendar.translations.CalendarRRuleTranslations;
import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.task.domain.CalendarTask;
import lombok.RequiredArgsConstructor;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.immutable.ImmutableCalScale;
import net.fortuna.ical4j.model.property.immutable.ImmutableVersion;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CalendarExporter implements CalendarExporting {
    private final static String prodId = "-//Ben Fortuna//iCal4j 1.0//EN";
    private final CalendarRRuleTranslations translator;

    @Override
    public Calendar export(List<CalendarEvent> events, List<CalendarTask> tasks, Boolean shouldAnonymize) {
        final var rruleEvents = translator.translateToRRuleEvents(events);
        final var rruleTasks = translator.translateToRRuleTasks(tasks);

        final var calendar = new Calendar();
        calendar.add(new ProdId(prodId));
        calendar.add(ImmutableVersion.VERSION_2_0);
        calendar.add(ImmutableCalScale.GREGORIAN);

        rruleEvents.forEach(calendar::add);
        rruleTasks.forEach(calendar::add);

        return calendar;
    }
}
