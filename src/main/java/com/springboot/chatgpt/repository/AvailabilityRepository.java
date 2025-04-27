package com.springboot.chatgpt.repository;

import com.springboot.chatgpt.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {}

