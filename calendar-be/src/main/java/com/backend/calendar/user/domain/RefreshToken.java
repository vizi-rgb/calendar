package com.backend.calendar.user.domain;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Optional;
import java.util.Set;

@Entity
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @EqualsAndHashCode.Include
    private String currentToken;

    @NotNull
    @ElementCollection
    @Builder.Default
    private Set<String> tokenFamily = Set.of();

    public Optional<String> getCurrentToken() {
        return Optional.ofNullable(currentToken);
    }

    public void addToTokenFamily(String previousToken) {
        tokenFamily.add(previousToken);
    }

    public void clearTokenFamily() {
        tokenFamily.clear();
    }

    public void rotateToken(String newToken) {
        if (currentToken != null) {
            addToTokenFamily(currentToken);
        }

        currentToken = newToken;
    }

    public boolean tokenInTokenFamily(String token) {
        return tokenFamily.contains(token);
    }

    public void invalidate() {
        currentToken = null;
        tokenFamily.clear();
    }
}
