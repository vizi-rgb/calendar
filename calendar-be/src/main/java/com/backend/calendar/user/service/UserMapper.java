package com.backend.calendar.user.service;

import com.backend.calendar.oauth.OauthProvider;
import com.backend.calendar.user.domain.User;
import com.backend.calendar.user.dto.AuthResponse;
import com.backend.calendar.user.dto.RegisterRequest;
import com.backend.calendar.user.dto.UserResource;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
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

    public User mapGoogleIdTokenToUser(GoogleIdToken.Payload googleIdToken) {
        final var uuid = UUID.nameUUIDFromBytes(googleIdToken.getEmail().getBytes(StandardCharsets.UTF_8));

        return User.builder()
            .uuid(uuid)
            .email(googleIdToken.getEmail())
            .name(googleIdToken.get("given_name").toString())
            .surname(googleIdToken.get("family_name").toString())
            .isEnabled(googleIdToken.getEmailVerified())
            .oauthProvider(OauthProvider.GOOGLE)
            .pictureUrl(googleIdToken.get("picture").toString())
            .password("")
            .build();
    }

    public UserResource mapUserToUserResource(User user) {
        return UserResource.builder()
            .userId(user.getUuid())
            .email(user.getEmail())
            .name(user.getName())
            .surname(user.getSurname())
            .pictureUrl(user.getPictureUrl())
            .build();
    }

    public AuthResponse mapUserToAuthResponse(String token, String refreshToken) {
        return AuthResponse.builder()
            .token(token)
            .refreshToken(refreshToken)
            .build();
    }
}
