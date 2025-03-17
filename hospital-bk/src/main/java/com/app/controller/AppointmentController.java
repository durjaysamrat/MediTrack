package com.app.controller;

import com.app.model.Appointment;
import com.app.service.AppointmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;
import java.util.HashMap;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:4200")  // Allow all origins (for testing)
@Slf4j
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody Map<String, Object> appointmentData) {
        try {
            log.info("Received request: {}", appointmentData); // ✅ Log full request data

            if (!appointmentData.containsKey("patientId") || 
                !appointmentData.containsKey("doctorId") || 
                !appointmentData.containsKey("date") || 
                !appointmentData.containsKey("time")) {
                return ResponseEntity.badRequest().body("Missing required fields: patientId, doctorId, date, or time");
            }

            Long patientId = Long.parseLong(appointmentData.get("patientId").toString());
            Long doctorId = Long.parseLong(appointmentData.get("doctorId").toString());
            LocalDate date = LocalDate.parse(appointmentData.get("date").toString());

            // ✅ Log the raw received time value
            String timeString = appointmentData.get("time").toString().trim();
            log.info("Received time string: '{}'", timeString);

            // ✅ Debug: Print each character of the time string
            for (char c : timeString.toCharArray()) {
                log.info("Char: '{}'", c);
            }

            // ✅ Convert to LocalTime
            LocalTime time;
            try {
                time = LocalTime.parse(timeString);
                log.info("Parsed LocalTime: {}", time);
            } catch (Exception e) {
                log.error("Time parsing failed: {}", e.getMessage());
                return ResponseEntity.badRequest().body("Invalid time format. Expected format: HH:mm (e.g., '13:30'). Received: " + timeString);
            }

            log.info("Booking appointment: Patient ID={}, Doctor ID={}, Date={}, Time={}", patientId, doctorId, date, time);

            Appointment bookedAppointment = appointmentService.bookAppointment(patientId, doctorId, date, time);

            return ResponseEntity.ok(bookedAppointment);
        } catch (Exception e) {
            log.error("Error booking appointment: {}", e.getMessage());
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }

    }
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Map<String, Object>>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctor(doctorId);

        // ✅ Convert to a List of Maps, EXCLUDING the "status" field
        List<Map<String, Object>> filteredAppointments = appointments.stream().map(appointment -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", appointment.getId());
            map.put("patientName", appointment.getPatient().getName());
            map.put("appointmentDate", appointment.getAppointmentDate());
            map.put("timeSlot", appointment.getTimeSlot());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(filteredAppointments);
    }
}