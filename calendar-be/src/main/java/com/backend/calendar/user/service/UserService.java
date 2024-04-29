package com.backend.calendar.user.service;

import com.backend.calendar.user.domain.User;
import com.backend.calendar.user.dto.RegisterRequest;
import com.backend.calendar.user.dto.UserResource;
import com.backend.calendar.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

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

        return userMapper.mapUserToUserResource(user);
    }

    public UserResource getUser(UUID userId) {
        return userRepository.findUserByUuid(userId)
            .map(userMapper::mapUserToUserResource)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public boolean checkIfEmailAvailable(String email) {
        return userRepository.findUserByEmail(email).isEmpty();
    }

}
