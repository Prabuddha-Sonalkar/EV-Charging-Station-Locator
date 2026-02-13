//package com.app.controller;
//
//import com.app.entity.AdminAction;
//import com.app.service.AdminActionService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/admin-actions")
//public class AdminActionController {
//
//    private final AdminActionService adminActionService;
//
//    public AdminActionController(AdminActionService adminActionService) {
//        this.adminActionService = adminActionService;
//    }
//
//    @PostMapping("/approve")
//    public ResponseEntity<String> approveStation(@RequestBody Map<String, Integer> body) {
//        Integer stationId = body.get("stationId");
//        Integer adminId = body.get("adminId");
//
//        adminActionService.approveStation(stationId, adminId);
//        return ResponseEntity.ok("Station approved");
//    }
//
//    @GetMapping
//    public ResponseEntity<List<AdminAction>> getAllAdminActions() {
//        return ResponseEntity.ok(adminActionService.getAllAdminActions());
//    }
//}
