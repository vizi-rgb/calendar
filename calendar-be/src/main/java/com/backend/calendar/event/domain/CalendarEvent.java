package com.backend.calendar.event.domain;

import com.backend.calendar.user.domain.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CalendarEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    private UUID uuid = UUID.randomUUID();

    @Enumerated(EnumType.STRING)
    private Frequency frequency;

    private Integer interval;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Day> daysOfWeek;

    private Date endDate;

    @NotNull
    private String title;

    @Size(max = 500)
    private String description;

    @ManyToOne
    private User user;
}
