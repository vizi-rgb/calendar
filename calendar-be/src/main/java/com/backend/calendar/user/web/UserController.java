package com.backend.calendar.user.web;

import com.backend.calendar.security.jwt.JwtProperties;
import com.backend.calendar.user.dto.*;
import com.backend.calendar.user.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
    private final JwtProperties jwtProperties;

    @PostMapping("/v1/register")
    public ResponseEntity<TokenContainer> registerUser(
        HttpServletResponse response,
        @RequestBody @Valid RegisterRequest registerRequest
    ) {
        final var registerResponse = userService.registerUser(registerRequest);

        log.info("Setting cookie for user {}", registerRequest.email());
        setCookie(response, registerResponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(new TokenContainer(registerResponse.token()));
    }

    @PostMapping("/v1/authenticate")
    public ResponseEntity<TokenContainer> authenticateUser(@RequestBody @Valid LoginRequest loginRequest) {
        final var registerResponse = userService.authenticateUser(loginRequest);
        return ResponseEntity.ok(new TokenContainer(registerResponse.token()));
    }

    @PostMapping("/v1/refresh")
    public ResponseEntity<TokenContainer> refreshToken(
        HttpServletResponse response,
        @CookieValue(name = "refresh_token") String refreshToken
    ) {
        final var authResponse = userService.refreshToken(refreshToken);
        setCookie(response, authResponse);
        return ResponseEntity.ok(new TokenContainer(authResponse.token()));
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

    @PostMapping("/oauth2/v1/google")
    public ResponseEntity<TokenContainer> authenticateWithGoogle(
        HttpServletResponse response,
        @RequestBody @Valid GoogleAuthRequest googleAuthRequest
    ) {
        final var authResponse = userService.authenticateWithGoogle(googleAuthRequest);
        setCookie(response, authResponse);
        return ResponseEntity.ok(new TokenContainer(authResponse.token()));
    }

    private void setCookie(HttpServletResponse response, AuthResponse authResponse) {
        final var cookie = new Cookie("refresh_token", authResponse.refreshToken());
        setCookieAttributes(cookie, "/api/user/v1/refresh", jwtProperties.getRefreshTokenExpiration().intValue());
        response.addCookie(cookie);
    }

    private void setCookieAttributes(Cookie cookie, String path, Integer maxAge) {
        cookie.setSecure(true);
        cookie.setPath(path);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);
    }

}
