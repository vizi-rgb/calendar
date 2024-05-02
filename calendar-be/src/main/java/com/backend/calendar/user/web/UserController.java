package com.backend.calendar.user.web;

import com.backend.calendar.user.dto.AuthResponse;
import com.backend.calendar.user.dto.LoginRequest;
import com.backend.calendar.user.dto.RegisterRequest;
import com.backend.calendar.user.dto.UserResource;
import com.backend.calendar.user.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/v1/register")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody @Valid RegisterRequest registerRequest) {
        final var registerResponse = userService.registerUser(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(registerResponse);
    }

    @PostMapping("/v1/authenticate")
    public ResponseEntity<AuthResponse> authenticateUser(@RequestBody @Valid LoginRequest loginRequest) {
        final var registerResponse = userService.authenticateUser(loginRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(registerResponse);
    }

    @GetMapping("/v1/email/{email}")
    public ResponseEntity<Void> checkIfEmailAvailable(@PathVariable @Email String email) {
        return userService.checkIfEmailAvailable(email) ?
            ResponseEntity.ok().build() :
            ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @GetMapping("/v1/{userId}")
    public ResponseEntity<UserResource> getUser(@PathVariable UUID userId) {
        return ResponseEntity.ok().body(userService.getUser(userId));
    }

    @PostMapping("/v1/{userId}/verify/{token}")
    public ResponseEntity<Void> verifyUser(@PathVariable UUID userId, @PathVariable UUID token) {
        log.info("Verifying user with id {}", userId);
        userService.verifyUser(userId, token);
        return ResponseEntity.ok().build();
    }

}
