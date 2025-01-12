# Scheduling and Event Management Application

This repository contains an application that provides a graphical interface for interacting with the user’s schedule and handles activities related to event and task management. The system operates on a client-server architecture, uses secure HTTP communication, and integrates with third-party services for authentication and email notifications.

## Project Overview

The system consists of two main components:

1. **Client-Side Application**:
    - Built with React, offering a user-friendly interface to interact with the user’s schedule.
    - Uses `react-big-calendar` and `react-day-picker` for managing and displaying events.
    - Supports server-side rendering and integrates with backend APIs for dynamic content.
    
2. **Server-Side Application**:
    - Built with Spring Boot, implementing RESTful APIs for task and event management.
    - Handles tasks, one-off events, recurring events, and events with custom recurrence patterns.
    - Securely authenticated using JSON Web Tokens (JWT) for both classic login (username/password) and OAuth login methods.
    - Supports interaction via iCalendar files, ensuring compatibility with other calendar systems.

The system also utilizes the **SMTP protocol** for sending emails and integrates with **Google OAuth** for third-party authentication.

## Features

- **Event Management**: Supports one-off and recurring events, including custom recurrence patterns.
- **Secure Authentication**: JWT-based authentication for secure access to the backend.
- **Google OAuth Login**: OAuth login via Google accounts for an additional authentication option.
- **Email Notifications**: Communicates with users via email using the SMTP protocol.
- **iCalendar Integration**: Supports interaction with other calendar solutions through iCalendar files.
- **Responsive Design**: A graphical interface that ensures smooth operation on various devices.

## Technologies

### Frontend:
- **React**: Core library for building the user interface.
- **React Big Calendar**: For managing and displaying events.
- **React Day Picker**: For date selection and calendar views.
- **Redux Toolkit**: For state management and persistent data storage.
- **Axios**: For HTTP requests to the server.
- **Tailwind CSS**: For styling and responsive layouts.

### Backend:
- **Spring Boot**: For building the server-side REST APIs.
- **Spring Security**: For authentication and securing the endpoints.
- **PostgreSQL**: For database management and storing user data and events.
- **iCal4j**: For iCalendar file generation and parsing.
- **JWT (JSON Web Token)**: For secure user authentication.
- **Lombok**: For reducing boilerplate code.

## Dependencies

### Backend (Spring Boot):

```gradle
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
    implementation("io.jsonwebtoken:jjwt-api:0.12.5")
    implementation("com.google.api-client:google-api-client:2.6.0")
    implementation("org.mapstruct:mapstruct:1.6.0")
    implementation("org.mnode.ical4j:ical4j:4.0.5")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    developmentOnly("org.springframework.boot:spring-boot-docker-compose")
    runtimeOnly("org.postgresql:postgresql")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.5")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    annotationProcessor("org.projectlombok:lombok")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.6.0")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
```

### Frontend (React and related libraries):

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.6.0",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-context-menu": "^2.1.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-icons": "^1.3.0",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-menubar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@react-oauth/google": "^0.12.1",
    "@reduxjs/toolkit": "^2.2.1",
    "axios": "^1.6.8",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "cmdk": "^1.0.0",
    "date-fns": "^3.3.1",
    "embla-carousel-react": "^8.0.0",
    "input-otp": "^1.0.1",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.364.0",
    "next": "^14.2.5",
    "next-themes": "^0.2.1",
    "prettier": "^3.2.5",
    "react": "^18",
    "react-big-calendar": "^1.13.4",
    "react-day-picker": "^8.10.0",
    "react-dom": "^18",
    "react-hook-form": "^7.52.0",
    "react-if": "^4.1.5",
    "react-query": "^3.39.3",
    "react-redux": "^9.1.0",
    "react-resizable-panels": "^2.0.12",
    "redux-persist": "^6.0.0",
    "sonner": "^1.4.3",
    "tailwind-merge": "^2.2.1",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.0",
    "yup": "^1.4.0",
    "zod": "^3.22.4"
  }
}
```

## Showcase

![login](https://github.com/user-attachments/assets/7c8bc0ef-e2fd-4230-899e-3adec5bc43fb)

![showcase](https://github.com/user-attachments/assets/2c65485e-23bb-4ebd-835a-af077846220c)

![Zrzut ekranu z 2025-01-11 20-59-52](https://github.com/user-attachments/assets/819db58f-5656-4ea9-a8dd-9007b5a9f8ac)

