package com.app.service;

import com.app.dto.BookingRequestDto;
import com.app.entity.Booking;
import java.util.List;

public interface BookingService {

    Booking saveBooking(Booking booking);

    Booking getBookingById(Integer bookingId);

    List<Booking> getAllBookings();
    
    Booking createBooking(BookingRequestDto request);
    
    Booking getLatestBookingForCustomer(Integer customerId);

    List<Booking> getBookingsForCustomer(Integer customerId);


}
