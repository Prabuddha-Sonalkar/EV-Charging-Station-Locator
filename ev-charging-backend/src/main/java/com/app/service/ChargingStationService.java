//package com.app.service;
//
//import com.app.entity.ChargingStation;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface ChargingStationService {
//
//    ChargingStation saveStation(ChargingStation station);
//
//    Optional<ChargingStation> getStationById(Integer stationId);
//
//    List<ChargingStation> getAllStations();
//
//    List<ChargingStation> getApprovedStations();
//
//    List<ChargingStation> getStationsByOwnerId(Integer ownerId);
//
//    // ✅ NEW (Add Station for Owner)
//    ChargingStation createStationForOwner(Integer ownerId, ChargingStation station);
//}


package com.app.service;

import com.app.entity.ChargingStation;
import java.util.List;
import java.util.Optional;

public interface ChargingStationService {

    ChargingStation saveStation(ChargingStation station);

    Optional<ChargingStation> getStationById(Integer id);

    List<ChargingStation> getAllStations();

    List<ChargingStation> getApprovedStations();

    List<ChargingStation> getPendingStations();

    List<ChargingStation> getStationsByOwnerId(Integer ownerId);

    ChargingStation createStationForOwner(Integer ownerId, ChargingStation station);

    void approveStation(Integer stationId);

    void rejectStation(Integer stationId);
}
