package com.springboot.chatgpt.repository;

import com.springboot.chatgpt.model.InterviewSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long> {
}
