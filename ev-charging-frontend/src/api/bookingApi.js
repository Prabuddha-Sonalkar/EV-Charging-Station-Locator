import api from "./axios";

// CREATE BOOKING
export const createBooking = (bookingData) => {
  return api.post("/bookings", bookingData);
};
// shows status on owner dashboard
export const getLatestBookingForCustomer = (customerId) => {
  return api.get(`/bookings/customer/${customerId}/latest`);
};

export const getBookingsForCustomer = (customerId) => {
  return api.get(`/bookings/customer/${customerId}`);
};

