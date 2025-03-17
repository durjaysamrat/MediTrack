package com.app.controller;

import com.app.service.adminloginservices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin-login")
@CrossOrigin(origins = "http://localhost:4200")
public class adminlogincontroller {
    @Autowired
    private adminloginservices adminLoginServices;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        boolean isValid = adminLoginServices.validateUser(username, password);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", isValid);
        response.put("message", isValid ? "Login successful" : "Invalid credentials");
        return response;
    }
}
