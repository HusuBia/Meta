package com.springboot.chatgpt.controller;

import com.springboot.chatgpt.dto.PromptRequest;
import com.springboot.chatgpt.service.ChatGPTService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatGPTController {

    private final ChatGPTService chatGPTService;

    public ChatGPTController(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    @PostMapping
    public String chat(@RequestBody PromptRequest promptRequest) {
        return chatGPTService.getChatReponse(promptRequest);
    }

}
