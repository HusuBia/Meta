package com.springboot.chatgpt.repository;

import com.springboot.chatgpt.model.Mentor;
import com.springboot.chatgpt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor, Long> {
    Optional<Mentor> findByUser(User user);
}

