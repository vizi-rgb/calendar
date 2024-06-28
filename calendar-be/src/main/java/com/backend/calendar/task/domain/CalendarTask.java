package com.backend.calendar.task.domain;

import com.backend.calendar.user.domain.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CalendarTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    private UUID uuid = UUID.randomUUID();

    @NotNull
    private LocalDateTime dateTime;

    private Long estimatedTimeInMinutes;

    @Builder.Default
    private boolean isDone = false;

    @NotNull
    private String title;

    @Size(max = 500)
    private String description;

    @ManyToOne
    private User user;
}
