package com.app.repository;

import com.app.entity.Charger;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChargerRepository
        extends JpaRepository<Charger, Integer> {
	List<Charger> findByStation_StationId(Integer stationId);


}
