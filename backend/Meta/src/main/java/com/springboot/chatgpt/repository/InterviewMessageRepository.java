package com.springboot.chatgpt.repository;

import com.springboot.chatgpt.model.InterviewMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewMessageRepository extends JpaRepository<InterviewMessage, Long> {
}
