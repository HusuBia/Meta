package com.springboot.chatgpt.controller;

import com.springboot.chatgpt.dto.UserProfileResponse;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.service.JwtService;
import com.springboot.chatgpt.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasRole('USER')")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMyProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);
        UserProfileResponse profile = userService.getProfileByEmail(email);
        return ResponseEntity.ok(profile);
    }
}

