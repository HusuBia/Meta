package com.springboot.chatgpt.service;

import com.springboot.chatgpt.dto.AuthRequest;
import com.springboot.chatgpt.dto.RegisterRequest;
import com.springboot.chatgpt.dto.UserProfileResponse;
import com.springboot.chatgpt.model.Admin;
import com.springboot.chatgpt.model.Role;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.repository.AdminRepository;
import com.springboot.chatgpt.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AdminRepository adminRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AdminRepository adminRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.adminRepository = adminRepository;
    }


    public ResponseEntity<String> register(RegisterRequest request) {
        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));

        try {
            user.setRole(Role.valueOf(request.role().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role");
        }

        userRepository.save(user);


        if (user.getRole() == Role.ADMIN) {
            Admin admin = new Admin();
            admin.setUser(user);
            admin.setDepartment("Default Department"); // sau preia din request dacă ai
            admin.setContactInfo("default@example.com"); // idem
            adminRepository.save(admin);
        }

        return ResponseEntity.ok("User registered successfully!");
    }


    public ResponseEntity<UserProfileResponse> login(AuthRequest request) {
        User user = userRepository.findByEmail(request.email());
        if (user == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid user or password");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        UserProfileResponse response = new UserProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                token
        );

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token)
                .body(response);
    }

    public UserProfileResponse getProfile(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Invalid data"));
        return new UserProfileResponse(user.getId(), user.getFullName(), user.getEmail(), user.getRole().name(), null);
    }

    public User findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return user;
    }
    public UserProfileResponse getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return new UserProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                null
        );
    }

}
