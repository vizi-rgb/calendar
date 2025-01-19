package com.backend.calendar.user.service;

import com.backend.calendar.mail.MailService;
import com.backend.calendar.oauth.OauthProvider;
import com.backend.calendar.oauth.service.GoogleTokenService;
import com.backend.calendar.security.jwt.JwtService;
import com.backend.calendar.user.domain.RefreshToken;
import com.backend.calendar.user.domain.User;
import com.backend.calendar.user.dto.*;
import com.backend.calendar.user.repository.UserRepository;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final MailService mailService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final GoogleTokenService googleTokenService;

    @Transactional
    public AuthResponse registerUser(RegisterRequest request) {
        if (userRepository.findUserByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }

        final var user = userRepository.save(userMapper.mapRegisterRequestToUser(request));
        sendVerificationEmail(user);
        final var authResponse = generateAuthResponse(user);
        setNewRefreshToken(user, authResponse.refreshToken());
        userRepository.save(user);

        return authResponse;
    }

    @Transactional
    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.email(),
                loginRequest.password()
            )
        );

        final var user = userRepository.findUserByEmail(loginRequest.email())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        final var authResponse = generateAuthResponse(user);
        setNewRefreshToken(user, authResponse.refreshToken());
        userRepository.save(user);

        return authResponse;
    }

    @Transactional(readOnly = true)
    public UserResource getUser(UUID userId) {
        return userRepository.findUserByUuid(userId)
            .map(userMapper::mapUserToUserResource)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Transactional(readOnly = true)
    public boolean checkIfEmailAvailable(String email) {
        return userRepository.findUserByEmail(email).isEmpty();
    }

    @Transactional
    public void verifyUser(UUID userId, UUID token) {
        final var user = userRepository.findUserByUuid(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        log.info("Verifying user with id {}", userId);
        log.info("Token: {}", token);
        log.info("EmailToken: {}", user.getEmailVerificationToken());

        if (!user.getEmailVerificationToken().equals(token)) {
            throw new IllegalArgumentException("Invalid token");
        }

        user.setIsEnabled(true);
        userRepository.save(user);
    }

    @Transactional
    public AuthResponse refreshToken(String refreshToken) {
        try {
            final var userEmail = jwtService.extractEmail(refreshToken);
            final var user = userRepository.findUserByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
            final var userRefreshToken = user.getRefreshToken();

            if (userRefreshToken == null) {
                throw new IllegalArgumentException("Invalid token");
            }

            final var isTokenValid = userRefreshToken
                .getCurrentToken()
                .map(
                    token ->
                        token.equals(refreshToken) && !jwtService.isTokenExpired(refreshToken)
                )
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));

            if (userRefreshToken.tokenInTokenFamily(refreshToken)) {
                log.info("Token is in token family, invalidating...");
                userRefreshToken.invalidate();
                throw new IllegalArgumentException("Invalid token");
            }

            if (!isTokenValid) {
                throw new IllegalArgumentException("Invalid token");
            }

            final var authResponse = generateAuthResponse(user);
            userRefreshToken.rotateToken(authResponse.refreshToken());
            userRepository.save(user);

            return authResponse;
        } catch (JwtException e) {
            throw new IllegalArgumentException("Invalid token");
        }
    }

    public AuthResponse authenticateWithGoogle(GoogleAuthRequest googleAuthRequest) {
        if (!googleTokenService.isTokenValid(googleAuthRequest.idToken())) {
            throw new IllegalArgumentException("Invalid token");
        }

        final var idToken = googleTokenService.extractPayload(googleAuthRequest.idToken());
        final var user = userRepository.findUserByEmail(idToken.getEmail())
            .orElseGet(() -> userRepository.save(userMapper.mapGoogleIdTokenToUser(idToken)));

        final var oauthProvider = user.getOauthProvider();
        if (oauthProvider == null || !oauthProvider.equals(OauthProvider.GOOGLE)) {
            throw new IllegalArgumentException("User already exists");
        }

        final var authResponse = generateAuthResponse(user);
        setNewRefreshToken(user, authResponse.refreshToken());
        userRepository.save(user);

        return authResponse;
    }

    private void sendVerificationEmail(User user) {
        final var token = user.getEmailVerificationToken();
        final var subject = "Verify your email";
        final var url = String.format("http://localhost:3000/auth/sign-up/confirmation/%s/%s", user.getUuid(), token);

        final var text = String.format(
            "Hello %s %s,\nClick the link to verify your email: %s",
            user.getName(),
            user.getSurname(),
            url
        );

        mailService.sendMail(user.getEmail(), subject, text);
    }

    private RefreshToken putRefreshTokenIfAbsent(User user, String refreshToken) {
        final var refreshTokenContainer = user.getRefreshToken();

        if (refreshTokenContainer != null) {
            return refreshTokenContainer;
        }

        final var token = RefreshToken.builder()
            .currentToken(refreshToken)
            .build();

        user.setRefreshToken(token);
        return null;
    }

    private AuthResponse generateAuthResponse(User user) {
        final var extraClaims = Map.of("userId", (Object) user.getUuid().toString());
        final var jwt = jwtService.generateToken(extraClaims, user);
        final var refreshToken = jwtService.generateRefreshToken(user);

        return userMapper.mapUserToAuthResponse(jwt, refreshToken);
    }

    private void setNewRefreshToken(User user, String refreshToken) {
        final var previousToken = putRefreshTokenIfAbsent(user, refreshToken);
        if (previousToken != null) {
            previousToken.clearTokenFamily();
            previousToken.setCurrentToken(refreshToken);
        }
    }
}
