//package com.app.service;
//
//import com.app.entity.ChargingStation;
//import com.app.repository.ChargingStationRepository;
//import org.springframework.stereotype.Service;
//
//import java.sql.Timestamp;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class ChargingStationServiceImpl implements ChargingStationService {
//
//    private final ChargingStationRepository stationRepository;
//
//    public ChargingStationServiceImpl(ChargingStationRepository stationRepository) {
//        this.stationRepository = stationRepository;
//    }
//
//    @Override
//    public ChargingStation saveStation(ChargingStation station) {
//        return stationRepository.save(station);
//    }
//
//    @Override
//    public Optional<ChargingStation> getStationById(Integer stationId) {
//        return stationRepository.findById(stationId);
//    }
//
//    @Override
//    public List<ChargingStation> getAllStations() {
//        return stationRepository.findAll();
//    }
//
//    @Override
//    public List<ChargingStation> getApprovedStations() {
//        return stationRepository.findByApprovalStatus("APPROVED");
//    }
//
//    @Override
//    public List<ChargingStation> getStationsByOwnerId(Integer ownerId) {
//        return stationRepository.findByOwnerId(ownerId);
//    }
//
//    // ✅ NEW LOGIC (SAFE)
//    @Override
//    public ChargingStation createStationForOwner(Integer ownerId, ChargingStation station) {
//
//        station.setOwnerId(ownerId);
//        station.setApprovalStatus("PENDING");
//        station.setCreatedAt(new Timestamp(System.currentTimeMillis()));
//
//        return stationRepository.save(station);
//    }
//}

package com.app.service;

import com.app.entity.ChargingStation;
import com.app.repository.ChargingStationRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ChargingStationServiceImpl implements ChargingStationService {

    private final ChargingStationRepository repo;

    public ChargingStationServiceImpl(ChargingStationRepository repo) {
        this.repo = repo;
    }

    @Override
    public ChargingStation saveStation(ChargingStation station) {
        return repo.save(station);
    }

    @Override
    public Optional<ChargingStation> getStationById(Integer id) {
        return repo.findById(id);
    }

    @Override
    public List<ChargingStation> getAllStations() {
        return repo.findAll();
    }

    @Override
    public List<ChargingStation> getApprovedStations() {
        return repo.findByApprovalStatus("APPROVED");
    }

    @Override
    public List<ChargingStation> getPendingStations() {
        return repo.findByApprovalStatus("PENDING");
    }

    @Override
    public List<ChargingStation> getStationsByOwnerId(Integer ownerId) {
        return repo.findByOwnerId(ownerId);
    }

    @Override
    public ChargingStation createStationForOwner(Integer ownerId, ChargingStation station) {
        station.setOwnerId(ownerId);
        station.setApprovalStatus("PENDING");  // ✅ always pending for admin approval
        return repo.save(station);
    }

    @Override
    public void approveStation(Integer stationId) {
        ChargingStation st = repo.findById(stationId)
                .orElseThrow(() -> new RuntimeException("Station not found"));
        st.setApprovalStatus("APPROVED");
        repo.save(st);
    }

    @Override
    public void rejectStation(Integer stationId) {
        ChargingStation st = repo.findById(stationId)
                .orElseThrow(() -> new RuntimeException("Station not found"));
        st.setApprovalStatus("REJECTED");
        repo.save(st);
    }
}
