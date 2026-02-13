package com.app.service;

import com.app.entity.ChargingSession;
import java.util.List;

public interface ChargingSessionService {

    ChargingSession saveChargingSession(ChargingSession session);

    List<ChargingSession> getAllChargingSessions();

    ChargingSession startSession(Integer bookingId);

    ChargingSession endSession(Integer sessionId);

    void startChargingSession(Integer bookingId);
}
