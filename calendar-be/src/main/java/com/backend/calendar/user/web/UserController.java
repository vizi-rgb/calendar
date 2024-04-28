package com.backend.calendar.user.web;

import com.backend.calendar.user.dto.RegisterRequest;
import com.backend.calendar.user.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @PostMapping("/v1/register")
    public ResponseEntity<Void> registerUser(@RequestBody @Valid RegisterRequest registerRequest) {
        userService.registerUser(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/v1/email/{email}")
    public ResponseEntity<Void> checkIfEmailAvailable(@PathVariable @Email String email) {
        return userService.checkIfEmailAvailable(email) ?
            ResponseEntity.ok().build() :
            ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
}
