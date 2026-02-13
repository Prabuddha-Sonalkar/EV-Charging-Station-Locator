package com.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "charger")
public class Charger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "charger_id")
    private Integer chargerId;

    @ManyToOne
    @JoinColumn(name = "station_id")
    private ChargingStation station;

    @Column(name = "charger_number")
    private String chargerNumber;

    @Column(name = "charger_type")
    private String chargerType;

    @Column(name = "power_rating")
    private String powerRating;

    @Column(name = "availability_status")
    private String availabilityStatus;

    public Charger() {}

    public Integer getChargerId() { return chargerId; }
    public void setChargerId(Integer chargerId) { this.chargerId = chargerId; }

    public ChargingStation getStation() { return station; }
    public void setStation(ChargingStation station) { this.station = station; }

    public String getChargerNumber() { return chargerNumber; }
    public void setChargerNumber(String chargerNumber) { this.chargerNumber = chargerNumber; }

    public String getChargerType() { return chargerType; }
    public void setChargerType(String chargerType) { this.chargerType = chargerType; }

    public String getPowerRating() { return powerRating; }
    public void setPowerRating(String powerRating) { this.powerRating = powerRating; }

    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }
}
