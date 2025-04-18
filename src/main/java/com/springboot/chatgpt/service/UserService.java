package com.springboot.chatgpt.service;

import com.springboot.chatgpt.dto.AuthRequest;
import com.springboot.chatgpt.dto.RegisterRequest;
import com.springboot.chatgpt.dto.UserProfileResponse;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void register(RegisterRequest request) {
        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPassword(md5(request.password()));
        user.setRole("USER");
        userRepository.save(user);
    }

    public UserProfileResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.email());
        if (user == null || !user.getPassword().equals(md5(request.password()))) {
            throw new RuntimeException("Invalid credentials");
        }
        return new UserProfileResponse(user.getId(), user.getFullName(), user.getEmail(), user.getRole());
    }

    public UserProfileResponse getProfile(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return new UserProfileResponse(user.getId(), user.getFullName(), user.getEmail(), user.getRole());
    }

    private String md5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] bytes = md.digest(input.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password");
        }
    }
}
