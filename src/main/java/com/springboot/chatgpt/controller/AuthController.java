package com.springboot.chatgpt.controller;

import com.springboot.chatgpt.dto.AuthRequest;
import com.springboot.chatgpt.dto.RegisterRequest;
import com.springboot.chatgpt.dto.UserProfileResponse;
import com.springboot.chatgpt.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        userService.register(request);
        return "User registered!";
    }

    @PostMapping("/login")
    public UserProfileResponse login(@RequestBody AuthRequest request) {
        return userService.login(request);
    }
}
