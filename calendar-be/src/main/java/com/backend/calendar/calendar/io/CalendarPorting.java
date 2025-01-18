package com.backend.calendar.calendar.io;

import com.backend.calendar.calendar.io.internal.importing.ImportSummary;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

public interface CalendarPorting {
    byte[] exportCalendar(UUID userUuid, Boolean shouldAnonymize) throws IOException;

    ImportSummary importCalendar(UUID userUuid, MultipartFile calendar);
}
