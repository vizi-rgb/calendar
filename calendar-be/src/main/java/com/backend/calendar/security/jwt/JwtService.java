package com.backend.calendar.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtProperties jwtProperties;

    public String extractEmail(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }

    public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver) {
        final var claims = extractClaims(jwt);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(Map.of(), userDetails);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(
            Map.of(),
            userDetails,
            jwtProperties.getRefreshTokenExpiration()
        );
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return generateToken(
            extraClaims,
            userDetails,
            jwtProperties.getAccessTokenExpiration()
        );
    }

    private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails, Long seconds) {
        return Jwts.builder()
            .claims(extraClaims)
            .subject(userDetails.getUsername())
            .issuedAt(Date.from(Instant.now()))
            .expiration(Date.from(Instant.now().plusSeconds(seconds)))
            .signWith(jwtProperties.getKey())
            .compact();
    }

    public boolean isTokenValid(String jwt, UserDetails userDetails) {
        final var email = extractEmail(jwt);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(jwt);
    }

    public boolean isTokenExpired(String jwt) {
        final var expiration = extractClaim(jwt, Claims::getExpiration);
        return expiration.before(Date.valueOf(LocalDate.now()));
    }

    private Claims extractClaims(String jwt) throws JwtException {
        final Jws<Claims> parsedJwt = Jwts.parser()
            .verifyWith(jwtProperties.getKey())
            .build()
            .parseSignedClaims(jwt);

        return parsedJwt.getPayload();
    }
}
