package com.project.authorization.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.authorization.dto.RegistrationRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class RegistrationController {

    private final UserDetailsManager userDetailsManager;
    private final PasswordEncoder passwordEncoder;

    public RegistrationController(UserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder) {
        this.userDetailsManager = userDetailsManager;
        this.passwordEncoder = passwordEncoder;
    }

    
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        if (userDetailsManager.userExists(registrationRequest.getUsername())) {
            return new ResponseEntity<>("Username already exists!", HttpStatus.BAD_REQUEST);
        }
        if (registrationRequest.getEmail() != null && !registrationRequest.getEmail().isEmpty() &&
            userDetailsManager.userExists(registrationRequest.getEmail())) { // Optional: Check if email is unique
            return new ResponseEntity<>("Email already registered!", HttpStatus.BAD_REQUEST);
        }

        // Create UserDetails object
        UserDetails newUser = User.builder()
                .username(registrationRequest.getUsername())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .roles("USER") // Assign default roles to new users
                .build();

        // Save the new user using UserDetailsManager
        userDetailsManager.createUser(newUser);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }
}
