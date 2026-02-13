package com.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "otp_session")
public class OtpSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "otp_id")
    private Integer otpId;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Column(name = "otp_code")
    private String otpCode;

    @Column(name = "otp_type")
    private String otpType;

    @Column(name = "expiry_time")
    private LocalDateTime expiryTime;

    @Column(name = "verified")
    private Boolean verified;
    
    

    public OtpSession() {}

    public Integer getOtpId() { return otpId; }
    public void setOtpId(Integer otpId) { this.otpId = otpId; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public String getOtpCode() { return otpCode; }
    public void setOtpCode(String otpCode) { this.otpCode = otpCode; }

    public String getOtpType() { return otpType; }
    public void setOtpType(String otpType) { this.otpType = otpType; }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(LocalDateTime expiryTime) {
        this.expiryTime = expiryTime;
    }


    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }
}
