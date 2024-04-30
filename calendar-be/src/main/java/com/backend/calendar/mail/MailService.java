package com.backend.calendar.mail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender javaMailSender;

    @Async
    public void sendMail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        final var from = "noreply@calendar.com";

        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        log.info("Sending email to {}", to);
        javaMailSender.send(message);
    }
}
