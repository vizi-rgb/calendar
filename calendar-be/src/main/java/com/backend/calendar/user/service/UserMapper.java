package com.backend.calendar.user.service;

import com.backend.calendar.user.domain.User;
import com.backend.calendar.user.dto.RegisterRequest;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Component
public class UserMapper {

    public User mapRegisterRequestToUser(RegisterRequest request) {
        final var uuid = UUID.nameUUIDFromBytes(request.email().getBytes(StandardCharsets.UTF_8));

        return User.builder()
            .uuid(uuid)
            .email(request.email())
            .name(request.name())
            .surname(request.surname())
            .password(request.password())
            .build();
    }
}
