package com.springboot.chatgpt.controller;

import com.springboot.chatgpt.service.AdminService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getUserStats() {
        return ResponseEntity.ok(adminService.getUserStatistics());
    }

    @GetMapping("/mentors")
    public ResponseEntity<?> getAllMentors() {
        return ResponseEntity.ok(adminService.getMentors());
    }

    @DeleteMapping("/mentor/{id}")
    public ResponseEntity<String> deleteMentor(@PathVariable Long id) {
        adminService.removeMentor(id);
        return ResponseEntity.ok("Mentor șters.");
    }

    @GetMapping("/reviews")
    public ResponseEntity<?> getAllReviews() {
        return ResponseEntity.ok(adminService.getAllReviews());
    }

    @DeleteMapping("/review/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        adminService.deleteReview(id);
        return ResponseEntity.ok("Review șters.");
    }

    @GetMapping("/export/users")
    public void exportUsers(HttpServletResponse response) throws Exception {
        adminService.exportUserDataToCSV(response);
    }
}
