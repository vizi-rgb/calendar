package com.backend.calendar.calendar.translations;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.domain.Event;
import com.backend.calendar.task.domain.CalendarTask;
import com.backend.calendar.task.domain.Task;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.component.VToDo;

import java.util.List;

public interface CalendarRRuleTranslations {
    VEvent translateToRRuleEvent(Event event);

    List<VEvent> translateToRRuleEvents(List<? extends Event> events);

    VEvent translateToRRuleTask(Task task);

    List<VEvent> translateToRRuleTasks(List<? extends Task> tasks);

    CalendarEvent translateFromRRuleEvent(VEvent event);

    List<CalendarEvent> translateFromRRuleEvents(List<VEvent> events);

    CalendarTask translateFromRRuleTask(VToDo task);

    List<CalendarTask> translateFromRRuleTasks(List<VToDo> tasks);
}
