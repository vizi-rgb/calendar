package com.backend.calendar.calendar.translations.internal;

import com.backend.calendar.calendar.translations.CalendarRRuleTranslations;
import com.backend.calendar.event.domain.Event;
import net.fortuna.ical4j.model.component.VEvent;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
class CalendarRRuleTranslator implements CalendarRRuleTranslations {
    @Override
    public VEvent translateToRRuleEvent(Event event) {
        return null;
    }

    @Override
    public List<VEvent> translateToRRuleEvents(List<? extends Event> events) {
        return List.of();
    }
}
