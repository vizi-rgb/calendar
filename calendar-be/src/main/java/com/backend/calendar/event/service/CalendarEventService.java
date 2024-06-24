package com.backend.calendar.event.service;

import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import com.backend.calendar.event.repository.CalendarEventRepository;
import com.backend.calendar.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
