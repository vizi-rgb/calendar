package com.backend.calendar.task.domain;

import com.backend.calendar.user.domain.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CalendarTask implements Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    private UUID uuid = UUID.randomUUID();

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    @Builder.Default
    private boolean isDone = false;

    @NotNull
    private String title;

    @Size(max = 500)
    private String description;

    private ZoneId zoneId;

    @ManyToOne
    private User user;
}
