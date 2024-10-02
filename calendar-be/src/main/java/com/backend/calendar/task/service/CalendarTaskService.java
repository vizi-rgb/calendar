package com.backend.calendar.task.service;

import com.backend.calendar.task.domain.CalendarTask;
import com.backend.calendar.task.dto.CalendarTaskResource;
import com.backend.calendar.task.dto.CreateCalendarTaskRequest;
import com.backend.calendar.task.dto.UpdateCalendarTaskRequest;
import com.backend.calendar.task.repository.CalendarTaskRepository;
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
public class CalendarTaskService {

    private final CalendarTaskRepository calendarTaskRepository;
    private final CalendarTaskMapper calendarTaskMapper;
    private final UserRepository userRepository;

    @Transactional
    public void createTask(CreateCalendarTaskRequest request, String userEmail) {
        final var user = userRepository.findUserByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        final var task = calendarTaskMapper
            .mapCreateCalendarTaskToCalendarTask(request);
        task.setUser(user);

        log.info("Creating task: {} for user {}", task.getTitle(), user.getEmail());
        calendarTaskRepository.save(task);
    }

    @Transactional(readOnly = true)
    public List<CalendarTaskResource> getUserTasks(String userEmail) {
        return calendarTaskRepository
            .findByUserEmail(userEmail)
            .stream()
            .map(calendarTaskMapper::mapCalendarTaskToResource)
            .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTask(String userEmail, UUID taskId) {
        final var user = userRepository.findUserByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        final var task = calendarTaskRepository.findByUuidAndUserEmail(taskId, userEmail)
            .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        log.info("Deleting task: {} for user {}", task.getTitle(), user.getEmail());
        calendarTaskRepository.delete(task);
    }

    @Transactional
    public void updateTask(String userEmail, UUID taskId, UpdateCalendarTaskRequest request) {
        final var user = userRepository.findUserByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        final var task = calendarTaskRepository.findByUuidAndUserEmail(taskId, userEmail)
            .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        doPartialUpdates(task, request);

        log.info("Updating task: {} for user {}", task.getTitle(), user.getEmail());
        calendarTaskRepository.save(task);
    }

    private void doPartialUpdates(CalendarTask task, UpdateCalendarTaskRequest request) {
        if (request.dateTime() != null) {
//            task.setDateTime(request.dateTime());
        }

        if (request.estimatedTimeInMinutes() != null) {
//            task.setEstimatedTimeInMinutes(request.estimatedTimeInMinutes());
        }

        if (request.isDone() != null) {
            task.setDone(request.isDone());
        }

        if (request.title() != null) {
            task.setTitle(request.title());
        }

        if (request.description() != null) {
            task.setDescription(request.description());
        }
    }
}
