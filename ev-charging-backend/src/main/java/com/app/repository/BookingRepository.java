package com.app.repository;

import com.app.entity.Booking;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository
        extends JpaRepository<Booking, Integer> {

    List<Booking> findByCustomer_UserIdOrderByBookingTimeDesc(Integer userId);

    List<Booking> findByCharger_ChargerId(Integer chargerId);

    List<Booking> findByCharger_ChargerIdAndStatusAndBookingTimeLessThanAndEndTimeGreaterThan(
            Integer chargerId,
            String status,
            Timestamp endTime,
            Timestamp startTime
    );
}
