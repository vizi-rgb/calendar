package com.backend.calendar.calendar.io.internal;

import com.backend.calendar.calendar.io.CalendarPorting;
import com.backend.calendar.calendar.io.internal.exporting.CalendarExporting;
import com.backend.calendar.calendar.io.internal.importing.CalendarImporting;
import com.backend.calendar.calendar.io.internal.importing.ImportSummary;
import com.backend.calendar.event.repository.CalendarEventRepository;
import com.backend.calendar.task.repository.CalendarTaskRepository;
import com.backend.calendar.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import net.fortuna.ical4j.data.CalendarBuilder;
import net.fortuna.ical4j.data.CalendarOutputter;
import net.fortuna.ical4j.data.ParserException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CalendarPortingService implements CalendarPorting {
    private final CalendarEventRepository eventRepository;
    private final CalendarTaskRepository taskRepository;
    private final UserRepository userRepository;
    private final CalendarExporting exporter;
    private final CalendarImporting importer;

    @Override
    public byte[] exportCalendar(UUID userUuid, Boolean shouldAnonymize) throws IOException {
        final var events = eventRepository.findByUserUuid(userUuid);
        final var tasks = taskRepository.findByUserUuid(userUuid);

        final var iCalendar = exporter.export(events, tasks, shouldAnonymize);
        final var output = new ByteArrayOutputStream();
        final var calendarOutputter = new CalendarOutputter();
        calendarOutputter.output(iCalendar, output);

        return output.toByteArray();
    }

    @Override
    @Transactional
    public ImportSummary importCalendar(UUID userUuid, MultipartFile file) {
        try {
            final var user = userRepository.findUserByUuid(userUuid).orElseThrow();
            final var calendarBuilder = new CalendarBuilder();
            final var calendar = calendarBuilder.build(file.getInputStream());
            final var eventsTasksCombined = importer.importCalendar(calendar, file.getOriginalFilename());

            eventsTasksCombined.events().forEach(event -> event.setUser(user));
            eventsTasksCombined.tasks().forEach(task -> task.setUser(user));

//            eventRepository.saveAll(eventsTasksCombined.events());
//            taskRepository.saveAll(eventsTasksCombined.tasks());

            return ImportSummary.builder()
                .name(file.getOriginalFilename())
                .numberOfEvents(eventsTasksCombined.events().size())
                .numberOfTasks(eventsTasksCombined.tasks().size())
                .build();
        } catch (IOException e) {
            return null;
        } catch (ParserException e) {
            throw new RuntimeException(e);
        }
    }
}
