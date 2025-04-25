package com.springboot.chatgpt.controller;

import com.springboot.chatgpt.dto.UserProfileResponse;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;


    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/profile/{id}")
    public UserProfileResponse getProfile(@PathVariable Long id) {
        return userService.getProfile(id);
    }
    @GetMapping("/debug/hash")
    public String hashPassword(@RequestParam String password) {
        return passwordEncoder.encode(password);
    }
}
