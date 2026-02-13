package com.app.service;

import com.app.entity.OtpSession;
import com.app.entity.Booking;
import com.app.entity.ChargingSession;
import com.app.repository.OtpSessionRepository;
import com.app.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OtpSessionServiceImpl implements OtpSessionService {

    private final OtpSessionRepository otpSessionRepository;
    private final BookingRepository bookingRepository;
    private final EmailService emailService;
    private final ChargingSessionService chargingSessionService;

    public OtpSessionServiceImpl(
            OtpSessionRepository otpSessionRepository,
            BookingRepository bookingRepository,
            EmailService emailService,
            ChargingSessionService chargingSessionService
    ) {
        this.otpSessionRepository = otpSessionRepository;
        this.bookingRepository = bookingRepository;
        this.emailService = emailService;
        this.chargingSessionService = chargingSessionService;
    }

    @Override
    public OtpSession saveOtpSession(OtpSession otpSession) {

        OtpSession savedOtp = otpSessionRepository.save(otpSession);

        Booking booking = bookingRepository.findById(
                otpSession.getBooking().getBookingId()
        ).orElseThrow(() -> new RuntimeException("Booking not found"));

        emailService.sendOtpEmail(
                booking.getCustomer().getEmail(),
                savedOtp.getOtpCode()
        );

        return savedOtp;
    }

    @Override
    public void generateOtp(Integer bookingId, String otpType) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        String otpCode = String.valueOf((int) (Math.random() * 900000) + 100000);

        OtpSession otpSession = new OtpSession();
        otpSession.setBooking(booking);
        otpSession.setOtpType(otpType);
        otpSession.setOtpCode(otpCode);
        otpSession.setVerified(false);
        otpSession.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpSessionRepository.save(otpSession);

        emailService.sendOtpEmail(
                booking.getCustomer().getEmail(),
                otpCode
        );
    }

    @Override
    public OtpSession getOtpById(Integer otpId) {
        return otpSessionRepository.findById(otpId)
                .orElseThrow(() -> new RuntimeException("OTP not found"));
    }

    @Override
    public List<OtpSession> getAllOtpSessions() {
        return otpSessionRepository.findAll();
    }

    // ✅ FIXED: HANDLE BOTH START AND END CHARGING
    @Override
    public void verifyOtp(Integer otpId, String inputOtp) {

        OtpSession otp = getOtpById(otpId);

        if (Boolean.TRUE.equals(otp.getVerified())) {
            throw new RuntimeException("OTP already used");
        }

        if (!otp.getOtpCode().equals(inputOtp)) {
            throw new RuntimeException("Invalid OTP");
        }

        otp.setVerified(true);
        otpSessionRepository.save(otp);

        Integer bookingId = otp.getBooking().getBookingId();

        // 🔥 START CHARGING
        if ("START_CHARGING".equals(otp.getOtpType())) {
            chargingSessionService.startChargingSession(bookingId);
        }

        // 🔥 END CHARGING
        if ("END_CHARGING".equals(otp.getOtpType())) {
            chargingSessionService
                .getAllChargingSessions()
                .stream()
                .filter(s ->
                        s.getBooking().getBookingId().equals(bookingId)
                        && "IN_PROGRESS".equals(s.getSessionStatus())
                )
                .findFirst()
                .ifPresent(s ->
                        chargingSessionService.endSession(s.getSessionId())
                );
        }
    }
}
