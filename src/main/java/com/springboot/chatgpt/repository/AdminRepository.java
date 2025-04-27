package com.springboot.chatgpt.repository;

import com.springboot.chatgpt.model.Admin;
import com.springboot.chatgpt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUser(User user);
}

