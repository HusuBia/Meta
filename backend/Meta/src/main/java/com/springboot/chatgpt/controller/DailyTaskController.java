package com.springboot.chatgpt.controller;

import com.springboot.chatgpt.dto.TaskRequest;
import com.springboot.chatgpt.model.DailyTask;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.service.DailyTaskService;
import com.springboot.chatgpt.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class DailyTaskController {

    private final DailyTaskService dailyTaskService;
    private final UserService userService;

    public DailyTaskController(DailyTaskService dailyTaskService, UserService userService) {
        this.dailyTaskService = dailyTaskService;
        this.userService = userService;
    }

    @GetMapping("/today")
    public List<DailyTask> getTodayTasks(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return dailyTaskService.getTasksForToday(user);
    }

    @PostMapping
    public DailyTask createTask(@RequestBody Map<String, String> payload, Principal principal) {
        if (principal == null) throw new RuntimeException("User not authenticated");

        String email = principal.getName();
        User user = userService.findByEmail(email);

        String title = payload.get("title");
        String description = payload.getOrDefault("description", "");

        return dailyTaskService.addTask(user, title, description);
    }



    @PatchMapping("/{id}/complete")
    public DailyTask completeTask(@PathVariable Long id) {
        return dailyTaskService.markCompleted(id);
    }
}
