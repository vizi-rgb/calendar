package com.backend.calendar.event.service;

import com.backend.calendar.event.domain.CalendarEvent;
import com.backend.calendar.event.dto.CalendarEventResource;
import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import com.backend.calendar.event.dto.UpdateCalendarEventRequest;
import com.backend.calendar.event.repository.CalendarEventRepository;
import com.backend.calendar.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CalendarEventService {

    private final CalendarEventRepository calendarEventRepository;
    private final CalendarEventMapper calendarEventMapper;
    private final UserRepository userRepository;

    @Transactional
    public void createEvent(CreateCalendarEventRequest request, String userEmail) {
        final var user = userRepository.findUserByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        final var event = calendarEventMapper
            .mapCreateCalenderEventRequestToCalendarEvent(request, user);

        log.info("Creating event: {} for user {}", event.getTitle(), user.getEmail());
        calendarEventRepository.save(event);
    }

    @Transactional(readOnly = true)
    public List<CalendarEventResource> getUserEvents(String userEmail) {
        return calendarEventRepository
            .findByUserEmail(userEmail)
            .stream()
            .map(calendarEventMapper::mapCalendarEventToResource)
            .collect(Collectors.toList());
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
}
