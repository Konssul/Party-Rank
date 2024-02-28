package com.konsul.partyrank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.konsul.partyrank.dto.request.LoginRequest;
import com.konsul.partyrank.dto.request.RegisterRequest;
import com.konsul.partyrank.dto.response.AuthResponse;
import com.konsul.partyrank.service.AuthService;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:4200"})
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request)
    {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(authService.register(request));
    }
}
