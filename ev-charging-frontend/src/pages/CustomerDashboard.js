import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getBookingsForCustomer } from "../api/bookingApi";
import OtpModal from "../components/OtpModal";

function CustomerDashboard() {
  const [activeBookings, setActiveBookings] = useState([]);
  const [loadingBooking, setLoadingBooking] = useState(true);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [chargingStartedBookingId, setChargingStartedBookingId] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser || !loggedInUser.userId) {
      setLoadingBooking(false);
      return;
    }

    getBookingsForCustomer(loggedInUser.userId)
      .then((res) => {
        const allBookings = res.data || [];

        // ✅ ACTIVE = STATUS BOOKED (NO TIME CHECK)
        const active = allBookings.filter(
          (b) => b.status === "BOOKED"
        );

        setActiveBookings(active);
      })
      .catch(() => setActiveBookings([]))
      .finally(() => setLoadingBooking(false));
  }, []);

  const handleStartCharging = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowOtpModal(true);
    setChargingStartedBookingId(bookingId);
  };

  const handleChargingCompleted = () => {
    setShowOtpModal(false);
    setActiveBookings((prev) =>
      prev.filter((b) => b.bookingId !== selectedBookingId)
    );
    setSelectedBookingId(null);
    setChargingStartedBookingId(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <div className="container mt-4 flex-grow-1">

        <div className="p-4 mb-4 bg-white rounded-4 shadow-sm">
          <h2 className="fw-bold">Welcome to EV Charge</h2>
          <p className="text-muted">
            Manage your EV charging activities from one place.
          </p>
        </div>

        {loadingBooking ? (
          <p>Loading your active bookings...</p>
        ) : activeBookings.length > 0 ? (
          activeBookings.map((booking) => (
            <div key={booking.bookingId} className="card mb-3 shadow-sm border-success">
              <div className="card-body">
                <h5 className="fw-bold text-success">Active Booking</h5>

                <p><strong>Station:</strong> {booking.charger?.station?.stationName}</p>
                <p><strong>Charger:</strong> {booking.charger?.chargerNumber}</p>
                <p><strong>Power:</strong> {booking.charger?.powerRating}</p>
                <p>
                  <strong>Booking Time:</strong>{" "}
                  {new Date(booking.bookingTime).toLocaleString()}
                </p>

                <button
                  className="btn btn-success mt-2"
                  disabled={chargingStartedBookingId === booking.bookingId}
                  onClick={() => handleStartCharging(booking.bookingId)}
                >
                  Start Charging
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info">
            No active bookings
          </div>
        )}

        {showOtpModal && selectedBookingId && (
          <OtpModal
            bookingId={selectedBookingId}
            onChargingCompleted={handleChargingCompleted}
          />
        )}

        <div className="row g-4 mt-3">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>🔍 Find Stations</h5>
                <a href="/map" className="btn btn-success btn-sm">Open Map</a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>My Bookings</h5>
                <a href="/my-bookings" className="btn btn-primary btn-sm">
                  View Bookings
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default CustomerDashboard;
