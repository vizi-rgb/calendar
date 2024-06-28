package com.backend.calendar.task.repository;

import com.backend.calendar.task.domain.CalendarTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CalendarTaskRepository extends JpaRepository<CalendarTask, Long> {
    List<CalendarTask> findByUserEmail(String userEmail);

    Optional<CalendarTask> findByUuidAndUserEmail(UUID uuid, String userEmail);
}
