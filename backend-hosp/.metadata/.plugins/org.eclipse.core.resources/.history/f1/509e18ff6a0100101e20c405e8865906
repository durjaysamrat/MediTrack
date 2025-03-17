package com.app.controller;

import com.app.model.Doctor;
import com.app.model.DoctorAvailability;
import com.app.service.DoctorAvailabilityService;
import com.app.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:4200")
public class DoctorController {

    private static final Logger logger = LoggerFactory.getLogger(DoctorController.class);

    @Autowired
    private DoctorAvailabilityService doctorAvailabilityService;

    @Autowired
    private DoctorService doctorService;

    // ✅ Login API (Fixed)
    @PostMapping("/login")
    public ResponseEntity<?> loginDoctor(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String rawPassword = loginData.get("password");

        Optional<Doctor> doctorOptional = doctorService.findByEmail(email);
        if (doctorOptional.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid Credentials"); // ❌ Doctor not found
        }

        Doctor doctor = doctorOptional.get();

        // ✅ Debugging logs
        System.out.println("Doctor Found: " + doctor.getEmail() + ", Password: " + doctor.getPassword());
        System.out.println("Entered Password: " + rawPassword);

        // ✅ Compare plain-text passwords (No Hashing)
        if (!rawPassword.equals(doctor.getPassword())) {  
            return ResponseEntity.status(401).body("Invalid Credentials"); // ❌ Wrong password
        }

        // ✅ Login successful
        return ResponseEntity.ok(Map.of(
            "message", "Login Successful!",
            "doctor", doctor
        ));
    }
}
