package com.backend.calendar.event.web;

import com.backend.calendar.event.dto.CreateCalendarEventRequest;
import com.backend.calendar.event.dto.SimpleCalendarEventResource;
import com.backend.calendar.event.dto.UpdateCalendarEventRequest;
import com.backend.calendar.event.service.CalendarEventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class CalendarEventController {

    private final CalendarEventService calendarEventService;

    @PostMapping()
    public ResponseEntity<Void> createEvent(
        Principal principal,
        @RequestBody @Valid CreateCalendarEventRequest request
    ) {
        calendarEventService.createEvent(request, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<SimpleCalendarEventResource>> getUserEvents(Principal principal) {
        return ResponseEntity.ok(calendarEventService.getUserEvents(principal.getName()));
    }

    @PatchMapping("/{eventId}")
    public ResponseEntity<Void> updateEvent(
        Principal principal,
        @PathVariable UUID eventId,
        @RequestBody @Valid UpdateCalendarEventRequest request
    ) {
        calendarEventService.updateEvent(principal.getName(), eventId, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(Principal principal, @PathVariable UUID eventId) {
        calendarEventService.deleteEvent(principal.getName(), eventId);
        return ResponseEntity.noContent().build();
    }
}
