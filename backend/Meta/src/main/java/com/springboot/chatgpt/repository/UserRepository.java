package com.springboot.chatgpt.repository;

import com.springboot.chatgpt.model.Role;
import com.springboot.chatgpt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findAllByRole(Role role);
    long countByRole(Role role);
}
