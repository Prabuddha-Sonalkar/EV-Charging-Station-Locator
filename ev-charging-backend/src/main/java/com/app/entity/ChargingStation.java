//
//
//package com.app.entity;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//import jakarta.persistence.*;
//import java.sql.Timestamp;
//
//@Entity
//@Table(name = "charging_station")
//public class ChargingStation {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "station_id")
//    @JsonProperty("stationId")
//    private Integer stationId;
//
//    @Column(name = "owner_id")
//    @JsonProperty("ownerId")
//    private Integer ownerId;
//
//    @Column(name = "station_name")
//    @JsonProperty("stationName")
//    private String stationName;
//
//    @Column(name = "address")
//    @JsonProperty("address")
//    private String address;
//
//    @Column(name = "city")
//    @JsonProperty("city")
//    private String city;
//
//    @Column(name = "state")
//    @JsonProperty("state")
//    private String state;
//
//    @Column(name = "latitude")
//    @JsonProperty("latitude")
//    private Double latitude;
//
//    @Column(name = "longitude")
//    @JsonProperty("longitude")
//    private Double longitude;
//
//    @Column(name = "approval_status")
//    @JsonProperty("approvalStatus")
//    private String approvalStatus;
//
//    @Column(name = "created_at")
//    @JsonProperty("createdAt")
//    private Timestamp createdAt;
//
//    public ChargingStation() {}
//
//    /* ===== Getters & Setters ===== */
//
//    public Integer getStationId() {
//        return stationId;
//    }
//
//    public void setStationId(Integer stationId) {
//        this.stationId = stationId;
//    }
//
//    public Integer getOwnerId() {
//        return ownerId;
//    }
//
//    public void setOwnerId(Integer ownerId) {
//        this.ownerId = ownerId;
//    }
//
//    public String getStationName() {
//        return stationName;
//    }
//
//    public void setStationName(String stationName) {
//        this.stationName = stationName;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public String getCity() {
//        return city;
//    }
//
//    public void setCity(String city) {
//        this.city = city;
//    }
//
//    public String getState() {
//        return state;
//    }
//
//    public void setState(String state) {
//        this.state = state;
//    }
//
//    public Double getLatitude() {
//        return latitude;
//    }
//
//    public void setLatitude(Double latitude) {
//        this.latitude = latitude;
//    }
//
//    public Double getLongitude() {
//        return longitude;
//    }
//
//    public void setLongitude(Double longitude) {
//        this.longitude = longitude;
//    }
//
//    public String getApprovalStatus() {
//        return approvalStatus;
//    }
//
//    public void setApprovalStatus(String approvalStatus) {
//        this.approvalStatus = approvalStatus;
//    }
//
//    public Timestamp getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(Timestamp createdAt) {
//        this.createdAt = createdAt;
//    }
//}


package com.app.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "charging_station")
public class ChargingStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "station_id")
    @JsonProperty("stationId")
    private Integer stationId;

    @Column(name = "owner_id")
    @JsonProperty("ownerId")
    private Integer ownerId;

    @Column(name = "station_name")
    @JsonProperty("stationName")
    private String stationName;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "approval_status")
    private String approvalStatus;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
        this.approvalStatus = "PENDING";
    }

    /* ===== Getters & Setters ===== */

    public Integer getStationId() {
        return stationId;
    }

    public void setStationId(Integer stationId) {
        this.stationId = stationId;
    }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
}
}
