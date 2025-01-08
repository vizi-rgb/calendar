package com.backend.calendar.calendar.io.internal.importing;

import lombok.Builder;

@Builder
public record ImportSummary(
    String name,
    Integer numberOfEvents,
    Integer numberOfTasks
) {
}
