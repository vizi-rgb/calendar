package com.backend.calendar.event.dto;

import com.backend.calendar.event.domain.Frequency;

import java.time.DayOfWeek;
import java.util.List;

public record CustomEventFrequency(
    Integer interval,
    Frequency frequency,
    List<DayOfWeek> daysOfWeek
) {
}
