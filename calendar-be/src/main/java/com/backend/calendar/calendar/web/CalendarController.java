package com.backend.calendar.calendar.web;

import com.backend.calendar.calendar.io.CalendarPorting;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        final var outputByteArray = calendarPorting.export(userUuid, shouldAnonymize);
        final var resource = new ByteArrayResource(outputByteArray);
        final var headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=calendar.ics");

        return ResponseEntity.ok().headers(headers).body(resource);
    }

}
