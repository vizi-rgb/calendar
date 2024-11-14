package com.backend.calendar.calendar.translations;

import com.backend.calendar.event.domain.Event;
import net.fortuna.ical4j.model.component.VEvent;

import java.util.List;

public interface CalendarRRuleTranslations {
    VEvent translateToRRuleEvent(Event event);

    List<VEvent> translateToRRuleEvents(List<? extends Event> events);
}
