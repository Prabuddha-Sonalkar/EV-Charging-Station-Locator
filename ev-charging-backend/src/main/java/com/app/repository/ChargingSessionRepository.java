//package com.app.repository;
//
//import com.app.entity.ChargingSession;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface ChargingSessionRepository
//        extends JpaRepository<ChargingSession, Integer> {
//}

package com.app.repository;

import com.app.entity.ChargingSession;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChargingSessionRepository
        extends JpaRepository<ChargingSession, Integer> {

    List<ChargingSession> findByBooking_Charger_ChargerId(Integer chargerId);
    List<ChargingSession> findByBooking_BookingId(Integer bookingId);
}
