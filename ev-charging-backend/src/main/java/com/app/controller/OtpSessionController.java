package com.app.controller;

import com.app.dto.OtpRequestDto;
import com.app.entity.OtpSession;
import com.app.service.OtpSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/otp")
public class OtpSessionController {

    private final OtpSessionService otpSessionService;

    public OtpSessionController(OtpSessionService otpSessionService) {
        this.otpSessionService = otpSessionService;
    }

    // ✅ MODIFIED (DTO-based, frontend-safe)
    @PostMapping
    public ResponseEntity<String> createOtp(@RequestBody OtpRequestDto request) {
        otpSessionService.generateOtp(request.getBookingId(), request.getOtpType());
        return ResponseEntity.ok("OTP generated and sent successfully");
    }

    // ❌ UNCHANGED
    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> body) {
        Integer otpId = Integer.parseInt(body.get("otpId"));
        String otpCode = body.get("otpCode");

        otpSessionService.verifyOtp(otpId, otpCode);
        return ResponseEntity.ok("OTP verified successfully");
    }

    // ❌ UNCHANGED
    @GetMapping
    public ResponseEntity<List<OtpSession>> getAllOtps() {
        return ResponseEntity.ok(otpSessionService.getAllOtpSessions());
    }
    
    @PostMapping("/start/{bookingId}")
    public ResponseEntity<String> generateStartOtp(
            @PathVariable Integer bookingId
    ) {
        otpSessionService.generateOtp(bookingId, "START_CHARGING");
        return ResponseEntity.ok("Start charging OTP sent");
    }

}
