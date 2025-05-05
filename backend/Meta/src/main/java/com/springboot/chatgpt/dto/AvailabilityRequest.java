package com.springboot.chatgpt.dto;

import java.time.LocalDateTime;

public record AvailabilityRequest(LocalDateTime start, LocalDateTime end) {}

