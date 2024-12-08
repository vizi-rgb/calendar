package com.backend.calendar.calendar.io;

import java.io.IOException;
import java.util.UUID;

public interface CalendarPorting {
    byte[] export(UUID userUuid, Boolean shouldAnonymize) throws IOException;
}
