package com.springboot.chatgpt.controller;

import com.springboot.chatgpt.dto.UserProfileResponse;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile/{id}")
    public UserProfileResponse getProfile(@PathVariable Long id) {
        return userService.getProfile(id);
    }
}
