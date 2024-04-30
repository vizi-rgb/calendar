package com.backend.calendar.user.domain;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID uuid;

    @NotNull
    private String email;

    @NotNull
    private String name;

    @NotNull
    private String surname;

    @NotNull
    private String password;

    @NotNull
    @Builder.Default
    private Boolean isAccountNonExpired = true;

    @NotNull
    @Builder.Default
    private Boolean isAccountNonLocked = true;

    @NotNull
    @Builder.Default
    private Boolean isCredentialsNonExpired = true;

    @NotNull
    @Builder.Default
    private Boolean isEnabled = false;

    @NotNull
    @Builder.Default
    private UUID emailVerificationToken = UUID.randomUUID();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

}
