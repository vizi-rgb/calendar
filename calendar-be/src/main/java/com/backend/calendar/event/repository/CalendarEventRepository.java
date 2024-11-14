package com.backend.calendar.event.repository;

import com.backend.calendar.event.domain.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
    List<CalendarEvent> findByUserEmail(String userEmail);

    List<CalendarEvent> findByUserUuid(UUID uuid);

    Optional<CalendarEvent> findByUuidAndUserEmail(UUID uuid, String userEmail);
}
