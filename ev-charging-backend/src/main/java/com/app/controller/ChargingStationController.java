//
//
//package com.app.controller;
//
//import com.app.entity.ChargingStation;
//import com.app.service.ChargingStationService;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/stations")
//@CrossOrigin(origins = "*")
//public class ChargingStationController {
//
//    private final ChargingStationService service;
//
//    public ChargingStationController(ChargingStationService service) {
//        this.service = service;
//    }
//
//    // ✅ Owner creates station request (PENDING)
//    @PostMapping("/owner/{ownerId}")
//    public ChargingStation createStation(@PathVariable Integer ownerId,
//                                          @RequestBody ChargingStation station) {
//        return service.createStationForOwner(ownerId, station);
//    }
//
//    // ✅ Owner fetch own stations
//    @GetMapping("/owner/{ownerId}")
//    public List<ChargingStation> ownerStations(@PathVariable Integer ownerId) {
//        return service.getStationsByOwnerId(ownerId);
//    }
//
//    // ✅ Admin fetch all PENDING stations
//    @GetMapping("/pending")
//    public List<ChargingStation> pendingStations() {
//        return service.getPendingStations();
//    }
//
//    // ✅ Admin approves station
//    @PutMapping("/{id}/approve")
//    public void approve(@PathVariable Integer id) {
//        service.approveStation(id);
//    }
//
//    // ✅ Admin rejects station
//    @PutMapping("/{id}/reject")
//    public void reject(@PathVariable Integer id) {
//        service.rejectStation(id);
//    }
//
//    // ✅ Public: Only APPROVED stations
//    @GetMapping("/approved")
//    public List<ChargingStation> approvedStations() {
//        return service.getApprovedStations();
//    }
//    
//   
//
//}
//
//
//

package com.app.controller;

import com.app.entity.ChargingStation;
import com.app.service.ChargingStationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stations")
@CrossOrigin(origins = "*")
public class ChargingStationController {

    private final ChargingStationService service;

    public ChargingStationController(ChargingStationService service) {
        this.service = service;
    }

    // Owner creates station request (PENDING)
    @PostMapping("/owner/{ownerId}")
    public ChargingStation createStation(@PathVariable Integer ownerId,
                                          @RequestBody ChargingStation station) {
        return service.createStationForOwner(ownerId, station);
    }

    // Owner fetch own stations
    @GetMapping("/owner/{ownerId}")
    public List<ChargingStation> ownerStations(@PathVariable Integer ownerId) {
        return service.getStationsByOwnerId(ownerId);
    }

    // Admin fetch all PENDING stations
    @GetMapping("/pending")
    public List<ChargingStation> pendingStations() {
        return service.getPendingStations();
    }

    // ✅ NEW: Admin fetch ALL stations
    @GetMapping("/all")
    public List<ChargingStation> allStations() {
        return service.getAllStations();
    }

    // Admin approve
    @PutMapping("/{id}/approve")
    public void approve(@PathVariable Integer id) {
        service.approveStation(id);
    }

    // Admin reject
    @PutMapping("/{id}/reject")
    public void reject(@PathVariable Integer id) {
        service.rejectStation(id);
    }

    // Public approved list
    @GetMapping("/approved")
    public List<ChargingStation> approvedStations() {
        return service.getApprovedStations();
    }
}

