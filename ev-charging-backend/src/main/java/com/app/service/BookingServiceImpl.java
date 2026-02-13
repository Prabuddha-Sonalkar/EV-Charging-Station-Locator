package com.app.service;

import com.app.dto.BookingRequestDto;
import com.app.entity.Booking;
import com.app.entity.Charger;
import com.app.entity.User;
import com.app.repository.BookingRepository;
import com.app.repository.ChargerRepository;
import com.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ChargerRepository chargerRepository;
    private final UserRepository userRepository;

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            ChargerRepository chargerRepository,
            UserRepository userRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.chargerRepository = chargerRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Booking createBooking(BookingRequestDto request) {

        Charger charger = chargerRepository.findById(request.getChargerId())
                .orElseThrow(() -> new RuntimeException("Charger not found"));

        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Timestamp requestedStart = Timestamp.valueOf(request.getBookingTime());
        Timestamp requestedEnd =
                Timestamp.valueOf(request.getBookingTime().plusHours(1));

        List<Booking> existingBookings =
                bookingRepository.findByCharger_ChargerId(
                        request.getChargerId()
                );

        for (Booking b : existingBookings) {

            if (!"BOOKED".equals(b.getStatus())) {
                continue;
            }

            Timestamp existingStart = b.getBookingTime();
            Timestamp existingEnd = b.getEndTime();

            if (requestedStart.before(existingEnd)
                    && requestedEnd.after(existingStart)) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Charger already booked for this time slot"
                );
            }
        }

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setCharger(charger);
        booking.setBookingTime(requestedStart);
        booking.setEndTime(requestedEnd);
        booking.setStatus("BOOKED");

        return bookingRepository.save(booking);
    }

    @Override
    public Booking saveBooking(Booking booking) {
        booking.setStatus("BOOKED");
        return bookingRepository.save(booking);
    }

    @Override
    public Booking getBookingById(Integer bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getLatestBookingForCustomer(Integer customerId) {
        return bookingRepository
                .findByCustomer_UserIdOrderByBookingTimeDesc(customerId)
                .stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<Booking> getBookingsForCustomer(Integer customerId) {
        return bookingRepository
                .findByCustomer_UserIdOrderByBookingTimeDesc(customerId);
    }
}
