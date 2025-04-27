package com.springboot.chatgpt.service;

import com.springboot.chatgpt.dto.AvailabilityRequest;
import com.springboot.chatgpt.dto.MentorRequest;
import com.springboot.chatgpt.model.Availability;
import com.springboot.chatgpt.model.Mentor;
import com.springboot.chatgpt.model.User;
import com.springboot.chatgpt.repository.AvailabilityRepository;
import com.springboot.chatgpt.repository.MentorRepository;
import org.springframework.stereotype.Service;

@Service
public class MentorService {

    private final MentorRepository profileRepo;
    private final AvailabilityRepository slotRepo;
    private final UserService userService;

    public MentorService(MentorRepository profileRepo,
                         AvailabilityRepository slotRepo,
                         UserService userService) {
        this.profileRepo = profileRepo;
        this.slotRepo = slotRepo;
        this.userService = userService;
    }

    public void saveProfile(MentorRequest request, String email) {
        User user = userService.findByEmail(email);
        Mentor profile = profileRepo.findByUser(user).orElse(new Mentor());
        profile.setUser(user);
        profile.setDescription(request.description());
        profile.setSpecialization(request.specialization());
        profileRepo.save(profile);
    }

    public void addAvailability(AvailabilityRequest req, String email) {
        User mentor = userService.findByEmail(email);
        Availability slot = new Availability();
        slot.setStart(req.start());
        slot.setEnd(req.end());
        slot.setMentor(mentor);
        slotRepo.save(slot);
    }
}

