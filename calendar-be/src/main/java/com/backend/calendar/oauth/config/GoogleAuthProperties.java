package com.backend.calendar.oauth.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.google")
@Getter
@Setter
public class GoogleAuthProperties {

    private String clientId;
    private String clientSecret;
}
