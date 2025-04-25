package com.springboot.chatgpt.service;

import com.springboot.chatgpt.model.DailyTask;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.repository.DailyTaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DailyTaskService {

    private final DailyTaskRepository dailyTaskRepository;

    public DailyTaskService(DailyTaskRepository dailyTaskRepository) {
        this.dailyTaskRepository = dailyTaskRepository;
    }

    public List<DailyTask> getTasksForToday(User user) {
        return dailyTaskRepository.findByUserAndDate(user, LocalDate.now());
    }

    public DailyTask addTask(User user, String title, String description) {
        DailyTask task = new DailyTask();
        task.setUser(user);
        task.setTitle(title);
        task.setDescription(description);
        task.setDate(LocalDate.now());
        task.setCompleted(false);
        return dailyTaskRepository.save(task);
    }

    public DailyTask markCompleted(Long taskId) {
        DailyTask task = dailyTaskRepository.findById(taskId).orElseThrow();
        task.setCompleted(true);
        return dailyTaskRepository.save(task);
    }
}
