package com.springboot.chatgpt.service;

import com.springboot.chatgpt.model.Role;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.repository.UserRepository;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> getUserStatistics() {
        long total = userRepository.count();
        long mentors = userRepository.countByRole(Role.MENTOR);
        long admins = userRepository.countByRole(Role.ADMIN);
        long users = userRepository.countByRole(Role.USER);
        return Map.of(
                "total", total,
                "mentors", mentors,
                "admins", admins,
                "users", users
        );
    }

    public List<User> getMentors() {
        return userRepository.findAllByRole(Role.MENTOR);
    }

    public void removeMentor(Long id) {
        userRepository.deleteById(id);
    }

    public List<String> getAllReviews() {
        return List.of("Review 1", "Review 2", "Review 3");
    }

    public void deleteReview(Long id) {
        // TODO: implementează logică reală
        System.out.println("Review " + id + " șters.");
    }

    public void exportUserDataToCSV(HttpServletResponse response) throws Exception {
        List<User> users = userRepository.findAll();

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=users.csv");

        PrintWriter writer = response.getWriter();
        writer.println("ID,Full Name,Email,Role");

        for (User user : users) {
            writer.printf("%d,%s,%s,%s%n", user.getId(), user.getFullName(), user.getEmail(), user.getRole());
        }

        writer.flush();
        writer.close();
    }
}
