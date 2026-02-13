package com.app.controller;

import com.app.entity.Charger;
import com.app.service.ChargerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chargers")
public class ChargerController {

    private final ChargerService chargerService;

    public ChargerController(ChargerService chargerService) {
        this.chargerService = chargerService;
    }

    // ✅ CREATE CHARGER
    @PostMapping
    public ResponseEntity<Charger> createCharger(@RequestBody Charger charger) {
        return ResponseEntity.ok(chargerService.saveCharger(charger));
    }

    // ✅ GET ALL CHARGERS
    @GetMapping
    public ResponseEntity<List<Charger>> getAllChargers() {
        return ResponseEntity.ok(chargerService.getAllChargers());
    }

    // ✅ GET CHARGER BY ID  ← THIS WAS MISSING
    @GetMapping("/{id}")
    public ResponseEntity<Charger> getChargerById(@PathVariable Integer id) {
        return ResponseEntity.ok(chargerService.getChargerById(id));
    }
    @GetMapping("/station/{stationId}")
    public ResponseEntity<List<Charger>> getChargersByStation(
            @PathVariable Integer stationId
    ) {
        return ResponseEntity.ok(
                chargerService.getChargersByStationId(stationId)
        );
    }
 // ✅ DELETE CHARGER
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharger(@PathVariable Integer id) {
        chargerService.deleteCharger(id);
        return ResponseEntity.noContent().build();
    }



}
