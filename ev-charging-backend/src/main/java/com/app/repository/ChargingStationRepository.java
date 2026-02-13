package com.app.repository;

import com.app.entity.ChargingStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChargingStationRepository extends JpaRepository<ChargingStation, Integer> {

    // Used by Map API
    List<ChargingStation> findByApprovalStatus(String approvalStatus);

    // ✅ ADD THIS (Owner flow)
    List<ChargingStation> findByOwnerId(Integer ownerId);
}
