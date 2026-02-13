package com.app.controller;

import com.app.dto.BookingRequestDto;
import com.app.entity.Booking;
import com.app.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequestDto request) {
        return ResponseEntity.ok(bookingService.createBooking(request));
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/customer/{customerId}/latest")
    public ResponseEntity<Booking> getLatestBookingForCustomer(
            @PathVariable Integer customerId
    ) {
        return ResponseEntity.ok(
                bookingService.getLatestBookingForCustomer(customerId)
        );
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Booking>> getBookingsForCustomer(
            @PathVariable Integer customerId
    ) {
        return ResponseEntity.ok(
                bookingService.getBookingsForCustomer(customerId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Integer id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }
}
