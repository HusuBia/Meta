package com.springboot.chatgpt.dto;

import java.util.List;

public record ChatGPTRequest(String model, List<Message> messages) {
    public record Message(String role, String content) {}
}
