package com.backend.calendar.task.web;

import com.backend.calendar.task.dto.CalendarTaskResource;
import com.backend.calendar.task.dto.CreateCalendarTaskRequest;
import com.backend.calendar.task.dto.UpdateCalendarTaskRequest;
import com.backend.calendar.task.service.CalendarTaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class CalendarTaskController {

    private final CalendarTaskService calendarTaskService;

    @PostMapping
    public ResponseEntity<Void> createTask(Principal principal, @RequestBody @Valid CreateCalendarTaskRequest request) {
        calendarTaskService.createTask(request, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<CalendarTaskResource>> getUserTasks(Principal principal) {
        return ResponseEntity.ok(calendarTaskService.getUserTasks(principal.getName()));
    }

    @PatchMapping("/{taskId}")
    public ResponseEntity<Void> updateTask(
        Principal principal,
        @PathVariable UUID taskId,
        @RequestBody @Valid UpdateCalendarTaskRequest request
    ) {
        calendarTaskService.updateTask(principal.getName(), taskId, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(Principal principal, @PathVariable UUID taskId) {
        calendarTaskService.deleteTask(principal.getName(), taskId);
        return ResponseEntity.noContent().build();
    }
}
