package com.backend.calendar.user.service;

import com.backend.calendar.user.domain.User;
import com.backend.calendar.user.dto.RegisterRequest;
import com.backend.calendar.user.dto.UserResource;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PasswordEncoder passwordEncoder;

    public User mapRegisterRequestToUser(RegisterRequest request) {
        final var uuid = UUID.nameUUIDFromBytes(request.email().getBytes(StandardCharsets.UTF_8));
        final var encodedPassword = passwordEncoder.encode(request.password());

        return User.builder()
            .uuid(uuid)
            .email(request.email())
            .name(request.name())
            .surname(request.surname())
            .password(encodedPassword)
            .build();
    }

    public UserResource mapUserToUserResource(User user) {
        return UserResource.builder()
            .userId(user.getUuid())
            .email(user.getEmail())
            .name(user.getName())
            .surname(user.getSurname())
            .build();
    }
}
