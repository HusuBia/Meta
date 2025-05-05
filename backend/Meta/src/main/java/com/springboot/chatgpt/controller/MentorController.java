package com.springboot.chatgpt.controller;

import com.springboot.chatgpt.dto.AvailabilityRequest;
import com.springboot.chatgpt.dto.MentorRequest;
import com.springboot.chatgpt.service.JwtService;
import com.springboot.chatgpt.service.MentorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mentor")
@PreAuthorize("hasRole('MENTOR')")
public class MentorController {

    private final MentorService mentorService;
    private final JwtService jwtService;

    public MentorController(MentorService mentorService, JwtService jwtService) {
        this.mentorService = mentorService;
        this.jwtService = jwtService;
    }

    @PostMapping("/profile")
    public ResponseEntity<String> createOrUpdateProfile(@RequestBody MentorRequest request,
                                                        @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        mentorService.saveProfile(request, email);
        return ResponseEntity.ok("Save profile successful");
    }

    @PostMapping("/availability")
    public ResponseEntity<String> addAvailability(@RequestBody AvailabilityRequest request,
                                                  @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        mentorService.addAvailability(request, email);
        return ResponseEntity.ok("Save availability successful");
    }
}

