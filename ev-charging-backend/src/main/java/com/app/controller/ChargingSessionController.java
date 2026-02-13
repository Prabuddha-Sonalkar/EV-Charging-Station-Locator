package com.app.controller;

import com.app.entity.ChargingSession;
import com.app.service.ChargingSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class ChargingSessionController {

    private final ChargingSessionService chargingSessionService;

    public ChargingSessionController(ChargingSessionService chargingSessionService) {
        this.chargingSessionService = chargingSessionService;
    }

    @PostMapping
    public ResponseEntity<ChargingSession> createSession(@RequestBody ChargingSession session) {
        return ResponseEntity.ok(chargingSessionService.saveChargingSession(session));
    }

    @PostMapping("/start/{bookingId}")
    public ResponseEntity<ChargingSession> startSession(@PathVariable Integer bookingId) {
        return ResponseEntity.ok(chargingSessionService.startSession(bookingId));
    }

    @PostMapping("/end/{sessionId}")
    public ResponseEntity<ChargingSession> endSession(@PathVariable Integer sessionId) {
        return ResponseEntity.ok(chargingSessionService.endSession(sessionId));
    }

    @GetMapping
    public ResponseEntity<List<ChargingSession>> getAllSessions() {
        return ResponseEntity.ok(chargingSessionService.getAllChargingSessions());
    }
}


