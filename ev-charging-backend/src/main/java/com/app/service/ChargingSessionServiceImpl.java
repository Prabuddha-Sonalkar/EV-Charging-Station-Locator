package com.app.service;

import com.app.entity.Booking;
import com.app.entity.Charger;
import com.app.entity.ChargingSession;
import com.app.repository.BookingRepository;
import com.app.repository.ChargerRepository;
import com.app.repository.ChargingSessionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ChargingSessionServiceImpl implements ChargingSessionService {

    private final ChargingSessionRepository chargingSessionRepository;
    private final BookingRepository bookingRepository;
    private final ChargerRepository chargerRepository;

    public ChargingSessionServiceImpl(
            ChargingSessionRepository chargingSessionRepository,
            BookingRepository bookingRepository,
            ChargerRepository chargerRepository) {
        this.chargingSessionRepository = chargingSessionRepository;
        this.bookingRepository = bookingRepository;
        this.chargerRepository = chargerRepository;
    }

    @Override
    public ChargingSession saveChargingSession(ChargingSession session) {
        return chargingSessionRepository.save(session);
    }

    @Override
    public List<ChargingSession> getAllChargingSessions() {
        return chargingSessionRepository.findAll();
    }

    @Override
    @Transactional
    public void startChargingSession(Integer bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Timestamp now = new Timestamp(System.currentTimeMillis());

        // ❌ cannot start before booking time
        if (now.before(booking.getBookingTime())) {
            throw new RuntimeException("Charging cannot start before booking time");
        }

        // ❌ cannot start after booking end time
        if (booking.getEndTime() != null && now.after(booking.getEndTime())) {
            throw new RuntimeException("Booking time has expired");
        }

        boolean chargerBusy =
                chargingSessionRepository
                        .findByBooking_Charger_ChargerId(
                                booking.getCharger().getChargerId()
                        )
                        .stream()
                        .anyMatch(s -> "IN_PROGRESS".equals(s.getSessionStatus()));

        if (chargerBusy) {
            throw new RuntimeException("Charger is currently in use");
        }

        ChargingSession session = new ChargingSession();
        session.setBooking(booking);
        session.setStartTime(now);
        session.setSessionStatus("IN_PROGRESS");

        chargingSessionRepository.save(session);

        Charger charger = booking.getCharger();
        charger.setAvailabilityStatus("IN_USE");
        chargerRepository.save(charger);
    }

    @Override
    @Transactional
    public ChargingSession startSession(Integer bookingId) {

        startChargingSession(bookingId);

        return chargingSessionRepository
                .findByBooking_BookingId(bookingId)
                .stream()
                .filter(s -> "IN_PROGRESS".equals(s.getSessionStatus()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Charging session not started"));
    }

    @Override
    @Transactional
    public ChargingSession endSession(Integer sessionId) {

        ChargingSession session = chargingSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setEndTime(new Timestamp(System.currentTimeMillis()));
        session.setSessionStatus("COMPLETED");

        Charger charger = session.getBooking().getCharger();
        charger.setAvailabilityStatus("FREE");
        chargerRepository.save(charger);

        Booking booking = session.getBooking();
        booking.setStatus("COMPLETED");
        bookingRepository.save(booking);

        return chargingSessionRepository.save(session);
    }
}
