//package com.app.service;
//
//import com.app.entity.AdminAction;
//import com.app.entity.ChargingStation;
//import com.app.entity.User;
//import com.app.repository.AdminActionRepository;
//import com.app.repository.ChargingStationRepository;
//import com.app.repository.UserRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class AdminActionServiceImpl implements AdminActionService {
//
//    private final AdminActionRepository adminActionRepository;
//    private final ChargingStationRepository stationRepository;
//    private final UserRepository userRepository;
//
//    public AdminActionServiceImpl(
//            AdminActionRepository adminActionRepository,
//            ChargingStationRepository stationRepository,
//            UserRepository userRepository) {
//        this.adminActionRepository = adminActionRepository;
//        this.stationRepository = stationRepository;
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public void approveStation(Integer stationId, Integer adminId) {
//
//        ChargingStation station = stationRepository.findById(stationId)
//                .orElseThrow(() -> new RuntimeException("Station not found"));
//
//        User admin = userRepository.findById(adminId)
//                .orElseThrow(() -> new RuntimeException("Admin not found"));
//
//        station.setApprovalStatus("APPROVED");
//        stationRepository.save(station);
//
//        AdminAction action = new AdminAction();
//        action.setAction("APPROVED_STATION");
//        action.setStation(station);
//        action.setAdmin(admin);
//
//        adminActionRepository.save(action);
//    }
//
//    @Override
//    public List<AdminAction> getAllAdminActions() {
//        return adminActionRepository.findAll();
//    }
//}
