package com.backend.calendar.calendar.io.internal;

import com.backend.calendar.calendar.io.CalendarPorting;
import com.backend.calendar.calendar.io.internal.export.CalendarExporting;
import com.backend.calendar.event.repository.CalendarEventRepository;
import com.backend.calendar.task.repository.CalendarTaskRepository;
import lombok.RequiredArgsConstructor;
import net.fortuna.ical4j.data.CalendarOutputter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CalendarPortingService implements CalendarPorting {
    private final CalendarEventRepository eventRepository;
    private final CalendarTaskRepository taskRepository;
    private final CalendarExporting exporter;

    @Override
    public byte[] export(UUID userUuid, Boolean shouldAnonymize) throws IOException {
        final var events = eventRepository.findByUserUuid(userUuid);
        final var tasks = taskRepository.findByUserUuid(userUuid);

        final var iCalendar = exporter.export(events, tasks, shouldAnonymize);
        final var output = new ByteArrayOutputStream();
        final var calendarOutputter = new CalendarOutputter();
        calendarOutputter.output(iCalendar, output);

        return output.toByteArray();
    }
}
