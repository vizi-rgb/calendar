package com.backend.calendar.calendar.web;

import com.backend.calendar.calendar.io.CalendarPorting;
import com.backend.calendar.calendar.io.internal.importing.ImportSummary;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarPorting calendarPorting;

    @GetMapping(
        value = "/v1/export/{userUuid}",
        produces = MediaType.APPLICATION_OCTET_STREAM_VALUE
    )
    public ResponseEntity<Resource> exportCalendar(
        @PathVariable UUID userUuid,
        @RequestParam(defaultValue = "false", required = false) Boolean shouldAnonymize
    ) throws IOException {
        final var outputByteArray = calendarPorting.exportCalendar(userUuid, shouldAnonymize);
        final var resource = new ByteArrayResource(outputByteArray);
        final var headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=calendar.ics");

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    @PostMapping(
        value = "/v1/import/{userUuid}",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ImportSummary> importCalendar(@PathVariable UUID userUuid, @RequestPart MultipartFile calendar) {
        final var summary = calendarPorting.importCalendar(userUuid, calendar);
        return ResponseEntity.ok(summary);
    }

}
