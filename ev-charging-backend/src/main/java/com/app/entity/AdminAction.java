//package com.app.entity;
//
//import jakarta.persistence.*;
//import java.sql.Timestamp;
//
//@Entity
//@Table(name = "admin_action")
//public class AdminAction {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "action_id")
//    private Integer actionId;
//
//    @ManyToOne
//    @JoinColumn(name = "admin_id")
//    private User admin;
//
//    @ManyToOne
//    @JoinColumn(name = "station_id")
//    private ChargingStation station;
//
//    @Column(name = "action")
//    private String action;
//
//    @Column(name = "action_time")
//    private Timestamp actionTime;
//
//    public AdminAction() {}
//
//    public Integer getActionId() { return actionId; }
//    public void setActionId(Integer actionId) { this.actionId = actionId; }
//
//    public User getAdmin() { return admin; }
//    public void setAdmin(User admin) { this.admin = admin; }
//
//    public ChargingStation getStation() { return station; }
//    public void setStation(ChargingStation station) { this.station = station; }
//
//    public String getAction() { return action; }
//    public void setAction(String action) { this.action = action; }
//
//    public Timestamp getActionTime() { return actionTime; }
//    public void setActionTime(Timestamp actionTime) { this.actionTime = actionTime; }
//}
