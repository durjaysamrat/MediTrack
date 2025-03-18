package com.app.controller;

import com.app.model.DoctorAvailability;
import com.app.service.DoctorAvailabilityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/availability")
@CrossOrigin(origins = "http://localhost:4200")  // Allows frontend (Angular) to access this API
@Slf4j
public class DoctorAvailabilityController {
	
	private static final Logger log = LoggerFactory.getLogger(DoctorAvailabilityController.class);

    @Autowired
    private DoctorAvailabilityService doctorAvailabilityService;

    // ✅ Endpoint to update doctor's availability
    @PostMapping("/{doctorId}")
    public ResponseEntity<?> updateAvailability(
            @PathVariable Long doctorId,
            @RequestBody Map<String, String> availabilityData) {

        try {
            if (!availabilityData.containsKey("availableFrom") || 
                !availabilityData.containsKey("availableTo") || 
                !availabilityData.containsKey("date")) {
                return ResponseEntity.badRequest().body("Missing required fields: availableFrom, availableTo, or date");
            }

            LocalDate availableDate = LocalDate.parse(availabilityData.get("date"));
            LocalTime availableFrom = LocalTime.parse(availabilityData.get("availableFrom"));
            LocalTime availableTo = LocalTime.parse(availabilityData.get("availableTo"));

            log.info("Updating availability for doctor ID: {}", doctorId);

            DoctorAvailability updatedAvailability = doctorAvailabilityService.updateDoctorAvailability(
                    doctorId, availableFrom, availableTo, availableDate
            );

            return ResponseEntity.ok(updatedAvailability);
        } catch (Exception e) {
            log.error("Error updating availability: {}", e.getMessage());
            return ResponseEntity.status(500).body("Error processing request: " + e.getMessage());
        }
    }
    
    @GetMapping("today/{doctorId}")
    public ResponseEntity<?> getTodayAvailability(@PathVariable Long doctorId) {
        try {
            LocalDate today = LocalDate.now();  // Get today's date
            DoctorAvailability todayAvailability = doctorAvailabilityService.getDoctorAvailabilityForDate(doctorId, today);

            if (todayAvailability != null) {
                return ResponseEntity.ok(todayAvailability);
            } else {
                return ResponseEntity.status(404).body("Doctor has no availability for today.");
            }
        } catch (Exception e) {
            log.error("Error fetching doctor's availability: {}", e.getMessage());
            return ResponseEntity.status(500).body("Error fetching availability: " + e.getMessage());
        }
    }

    // ✅ Endpoint to check if a doctor is available at a given time
    @GetMapping("/check")
    public ResponseEntity<?> checkAvailability(
            @RequestParam Long doctorId,
            @RequestParam LocalDate date,
            @RequestParam LocalTime time) {  // ✅ Changed to LocalDate & LocalTime

        try {
            boolean isAvailable = doctorAvailabilityService.isDoctorAvailable(doctorId, date, time);
            return ResponseEntity.ok(Map.of("available", isAvailable));
        } catch (Exception e) {
            log.error("Error checking doctor availability: {}", e.getMessage());
            return ResponseEntity.status(500).body("Error checking availability: " + e.getMessage());
        }
    }
}
