package com.backend.calendar.event.service;

import com.backend.calendar.calendar.calculations.CalendarCalculations;
import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import com.backend.calendar.event.dto.GetCalendarEventsRequest;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;
import com.backend.calendar.event.dto.UpdateCalendarEventRequest;
import com.backend.calendar.event.mapping.CalendarEventMappingUseCases;
import com.backend.calendar.event.repository.CalendarEventRepository;
import com.backend.calendar.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class CalendarEventService {

    private final CalendarEventRepository calendarEventRepository;
    private final CalendarEventMappingUseCases calendarEventMappingUseCases;
    private final CalendarCalculations calendarCalculations;
    private final UserRepository userRepository;

    @Transactional
    public void createEvent(CreateCalendarEventRequest request, String userEmail) {
        final var user = userRepository.findUserByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        log.info(request.toString());
        final var calendarEvent = calendarEventMappingUseCases.toCalendarEvent(request);

        calendarEvent.setUser(user);

        log.info("Creating event: {} for user {}", calendarEvent.getTitle(), user.getEmail());
        calendarEventRepository.save(calendarEvent);
    }

    @Transactional(readOnly = true)
    public Page<SimpleCalendarEventResource> getUserEvents(GetCalendarEventsRequest request, UUID userUuid, Pageable pageable) {
        final var userEvents = calendarEventRepository.findByUserUuid(userUuid);
        final var simpleEvents = calendarCalculations.calculateEventsForPeriod(
            userEvents,
            ZonedDateTime.of(request.from(), request.zoneId()),
            ZonedDateTime.of(request.to(), request.zoneId())
        );

        final var content = getEventSubList(simpleEvents, pageable);

        return new PageImpl<>(
            content,
            pageable,
            simpleEvents.size()
        );
    }

    @Transactional
    public void deleteEvent(String userEmail, UUID eventId) {
        final var user = userRepository.findUserByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        final var event = calendarEventRepository.findByUuidAndUserEmail(eventId, userEmail)
            .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        log.info("Deleting event: {} for user {}", event.getTitle(), user.getEmail());
        calendarEventRepository.delete(event);
    }

    @Transactional
    public void updateEvent(String userEmail, UUID eventId, UpdateCalendarEventRequest request) {
        final var user = userRepository.findUserByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        final var event = calendarEventRepository.findByUuidAndUserEmail(eventId, userEmail)
            .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        doPartialUpdates(event, request);

        log.info("Updating event: {} for user {}", event.getTitle(), user.getEmail());
        calendarEventRepository.save(event);
    }

    private void doPartialUpdates(CalendarEvent event, UpdateCalendarEventRequest request) {
        if (request.frequency() != null) {
            event.setFrequency(request.frequency());
        }
        if (request.interval() != null) {
            event.setInterval(request.interval());
        }
        if (request.daysOfWeek() != null) {
            event.setDaysOfWeek(request.daysOfWeek());
        }
        if (request.startDateTime() != null) {
            event.setStartDateTime(request.startDateTime());
        }
        if (request.endDateTime() != null) {
            event.setEndDateTime(request.endDateTime());
        }
        if (request.title() != null) {
            event.setTitle(request.title());
        }
        if (request.description() != null) {
            event.setDescription(request.description());
        }
    }

    private List<SimpleCalendarEventResource> getEventSubList(
        List<SimpleCalendarEventResource> events,
        Pageable pageable
    ) {
        int start = Math.min((int) pageable.getOffset(), events.size());
        int end = Math.min(start + pageable.getPageSize(), events.size());

        return events.subList(start, end);
    }
}
