package com.backend.calendar.event.web;

import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import com.backend.calendar.event.service.CalendarEventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class CalendarEventController {

    private final CalendarEventService calendarEventService;

    @PostMapping
    public ResponseEntity<Void> createEvent(Principal principal, @RequestBody @Valid CreateCalendarEventRequest request) {
        calendarEventService.createEvent(request, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
