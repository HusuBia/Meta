package com.springboot.chatgpt.service;

import com.springboot.chatgpt.dto.AuthRequest;
import com.springboot.chatgpt.dto.RegisterRequest;
import com.springboot.chatgpt.dto.UserProfileResponse;
import com.springboot.chatgpt.model.Role;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public ResponseEntity<String> register(RegisterRequest request) {
        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(Role.USER);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    public ResponseEntity<UserProfileResponse> login(AuthRequest request) {
        User user = userRepository.findByEmail(request.email());
        if (user == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid user or password");
        }

        UserProfileResponse response = new UserProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name()
        );

        return ResponseEntity.ok()
                .header("Message", "Sucessfully logged in")
                .body(response);
    }


    public UserProfileResponse getProfile(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Invalid data"));
        return new UserProfileResponse(user.getId(), user.getFullName(), user.getEmail(), user.getRole().name());
    }

    public User findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return user;
    }
}
