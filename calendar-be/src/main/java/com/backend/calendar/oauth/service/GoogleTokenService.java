package com.backend.calendar.oauth.service;

import com.backend.calendar.oauth.config.GoogleAuthProperties;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class GoogleTokenService {
    private final GoogleAuthProperties googleAuthProperties;

    public <T> T extractClaim(String jwt, Function<GoogleIdToken.Payload, T> claimsResolver) {
        return claimsResolver.apply(extractPayload(jwt));
    }

    public boolean isTokenValid(String jwt) {
        final var verifier = verifier();

        try {
            return verifier.verify(jwt) != null;
        } catch (Exception e) {
            return false;
        }
    }

    public GoogleIdToken.Payload extractPayload(String jwt) {
        try {
            final var idToken = verifier().verify(jwt);

            if (idToken == null) {
                return null;
            }

            return idToken.getPayload();
        } catch (Exception e) {
            return null;
        }
    }

    private GoogleIdTokenVerifier verifier() {
        return new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(),
            new GsonFactory()
        )
            .setAudience(Collections.singleton(googleAuthProperties.getClientId()))
            .build();
    }
}
