package com.backend.calendar.user.service;

import com.backend.calendar.mail.MailService;
import com.backend.calendar.security.jwt.JwtService;
import com.backend.calendar.user.domain.User;
import com.backend.calendar.user.dto.AuthResponse;
import com.backend.calendar.user.dto.LoginRequest;
import com.backend.calendar.user.dto.RegisterRequest;
import com.backend.calendar.user.dto.UserResource;
import com.backend.calendar.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Random;
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

    @Transactional
    public AuthResponse registerUser(RegisterRequest request) {
        if (userRepository.findUserByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }

        final var delay = new Random().nextInt(3000);
        User user = null;

        try {
            Thread.sleep(delay);
            user = userRepository.save(userMapper.mapRegisterRequestToUser(request));
        } catch (InterruptedException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Error while saving user");
        }

        sendVerificationEmail(user);
        final Map<String, Object> claim = Map.of("userId", user.getUuid());
        final var jwt = jwtService.generateToken(claim, user);
        return userMapper.mapUserToAuthResponse(user, jwt);
    }

    @Transactional
    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        final var delay = new Random().nextInt(3000);
        try {
            Thread.sleep(delay);
        } catch (InterruptedException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Error while authenticating user");
        }

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.email(),
                loginRequest.password()
            )
        );

        final var user = userRepository.findUserByEmail(loginRequest.email())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        final Map<String, Object> claim = Map.of("userId", user.getUuid());
        final var jwt = jwtService.generateToken(claim, user);


        return userMapper.mapUserToAuthResponse(user, jwt);
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
}
