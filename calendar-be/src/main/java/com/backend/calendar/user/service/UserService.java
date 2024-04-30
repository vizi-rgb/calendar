package com.backend.calendar.user.service;

import com.backend.calendar.mail.MailService;
import com.backend.calendar.user.domain.User;
import com.backend.calendar.user.dto.RegisterRequest;
import com.backend.calendar.user.dto.UserResource;
import com.backend.calendar.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final MailService mailService;

    @Transactional
    public UserResource registerUser(RegisterRequest request) {
        if (userRepository.findUserByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }

        final var delay = new Random().nextInt(5000);
        User user = null;

        try {
            Thread.sleep(delay);
            user = userRepository.save(userMapper.mapRegisterRequestToUser(request));
        } catch (InterruptedException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Error while saving user");
        }

        sendVerificationEmail(user);
        return userMapper.mapUserToUserResource(user);
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
