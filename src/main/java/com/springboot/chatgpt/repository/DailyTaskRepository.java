package com.springboot.chatgpt.repository;

import com.springboot.chatgpt.model.DailyTask;
import com.springboot.chatgpt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyTaskRepository extends JpaRepository<DailyTask, Long> {
    List<DailyTask> findByUserAndDate(User user, LocalDate date);
}
