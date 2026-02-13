package com.app.service;

import com.app.entity.OtpSession;
import java.util.List;

public interface OtpSessionService {

    OtpSession saveOtpSession(OtpSession otpSession);

    OtpSession getOtpById(Integer otpId);

    List<OtpSession> getAllOtpSessions();

    void verifyOtp(Integer otpId, String inputOtp);
    void generateOtp(Integer bookingId, String otpType);

}
