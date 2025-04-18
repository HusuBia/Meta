package com.springboot.chatgpt.controller;

import com.springboot.chatgpt.dto.InterviewChatRequest;
import com.springboot.chatgpt.dto.InterviewResponse;
import com.springboot.chatgpt.dto.StartInterviewRequest;
import com.springboot.chatgpt.model.InterviewSession;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.repository.UserRepository;
import com.springboot.chatgpt.service.InterviewService;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/interview")
public class InterviewController {

    private final InterviewService interviewService;
    private final UserRepository userRepository;

    public InterviewController(InterviewService interviewService, UserRepository userRepository) {
        this.interviewService = interviewService;
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void initDummyUser() {
        if (!userRepository.existsById(1L)) {
            User u = new User();
            u.setFullName("Demo");
            u.setEmail("demo@test.com");
            u.setPassword("1234");
            u.setRole("USER");
            userRepository.save(u);
        }
    }

    @PostMapping("/start")
    public InterviewSession start(@RequestBody StartInterviewRequest request) {
        User dummyUser = userRepository.findById(1L).orElseThrow();
        return interviewService.startInterview(request, dummyUser);
    }

    @PostMapping("/chat")
    public InterviewResponse chat(@RequestBody InterviewChatRequest request) {
        return interviewService.sendMessage(request);
    }
}

