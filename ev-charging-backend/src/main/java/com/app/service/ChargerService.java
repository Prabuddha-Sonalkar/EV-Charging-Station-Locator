package com.app.service;

import com.app.entity.Charger;
import java.util.List;

public interface ChargerService {

    Charger saveCharger(Charger charger);

    Charger getChargerById(Integer id);

    List<Charger> getAllChargers();
    
    List<Charger> getChargersByStation(Integer stationId);
   
    List<Charger> getChargersByStationId(Integer stationId);

    void deleteCharger(Integer id);

}
