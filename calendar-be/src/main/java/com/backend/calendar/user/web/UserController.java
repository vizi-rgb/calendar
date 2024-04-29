package com.backend.calendar.user.web;

import com.backend.calendar.user.dto.RegisterRequest;
import com.backend.calendar.user.dto.UserResource;
import com.backend.calendar.user.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/v1/register")
    public ResponseEntity<UserResource> registerUser(@RequestBody @Valid RegisterRequest registerRequest) {
        final var registerResponse = userService.registerUser(registerRequest);
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

}
