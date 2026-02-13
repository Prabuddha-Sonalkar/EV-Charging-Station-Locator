import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBookingsForCustomer } from "../api/bookingApi";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ AUTH SOURCE = localStorage (FINAL)
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser || !loggedInUser.userId) {
      setLoading(false);
      return;
    }

    getBookingsForCustomer(loggedInUser.userId)
      .then((res) => {
        setBookings(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <div className="container mt-4 flex-grow-1">
        <h3 className="fw-bold mb-4">My Bookings</h3>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-muted">No bookings found.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.bookingId} className="card mb-3 shadow-sm">
              <div className="card-body">
                <p>
                  <strong>Station:</strong>{" "}
                  {b.charger?.station?.stationName || "N/A"}
                </p>

                <p>
                  <strong>Charger:</strong>{" "}
                  {b.charger?.chargerNumber || "N/A"}
                </p>

                <p>
                  <strong>Power:</strong>{" "}
                  {b.charger?.powerRating || "N/A"}
                </p>

                <p>
                  <strong>Start Time:</strong>{" "}
                  {b.bookingTime
                    ? new Date(b.bookingTime).toLocaleString()
                    : "N/A"}
                </p>

                {b.endTime && (
                  <p>
                    <strong>End Time:</strong>{" "}
                    {new Date(b.endTime).toLocaleString()}
                  </p>
                )}

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      b.status === "COMPLETED"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {b.status}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MyBookings;
