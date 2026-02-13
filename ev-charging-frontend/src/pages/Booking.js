import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createBooking } from "../api/bookingApi";
import { getChargersByStation } from "../api/chargerApi";

function Booking() {
  const location = useLocation();
  const station = location.state?.station;

  const [bookingTime, setBookingTime] = useState("");
  const [selectedChargerId, setSelectedChargerId] = useState("");
  const [chargers, setChargers] = useState([]);
  const [loadingChargers, setLoadingChargers] = useState(true);

  // FETCH CHARGERS FOR SELECTED STATION
  useEffect(() => {
    if (!station?.stationId) return;

    setLoadingChargers(true);
    getChargersByStation(station.stationId)
      .then((res) => {
        setChargers(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load chargers", err);
        setChargers([]);
      })
      .finally(() => {
        setLoadingChargers(false);
      });
  }, [station]);

  const handleBooking = async (e) => {
    e.preventDefault();

    // ✅ AUTH SOURCE = localStorage (FINAL)
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser || !loggedInUser.userId) {
      alert("User not logged in");
      return;
    }

    if (!selectedChargerId) {
      alert("Please select a charger");
      return;
    }

    const bookingData = {
      customerId: loggedInUser.userId,
      chargerId: Number(selectedChargerId),
      bookingTime: bookingTime,
      status: "BOOKED",
    };

    try {
      await createBooking(bookingData);
      alert("Booking successful");
      window.location.href = "/customer";
    } catch (err) {
      const message =
        err.response?.data?.message || "Booking failed";
      alert(message);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">

                <h3 className="text-center fw-bold mb-3">
                  EV Charger Booking
                </h3>

                {station && (
                  <div className="alert alert-info py-2">
                    <strong>Station:</strong> {station.stationName}
                  </div>
                )}

                <form onSubmit={handleBooking}>

                  <div className="mb-3">
                    <label className="form-label">Select Charger</label>
                    <select
                      className="form-select"
                      value={selectedChargerId}
                      onChange={(e) => setSelectedChargerId(e.target.value)}
                      disabled={loadingChargers}
                      required
                    >
                      <option value="">
                        {loadingChargers
                          ? "Loading chargers..."
                          : "Select a charger"}
                      </option>

                      {chargers.map((ch) => (
                        <option
                          key={ch.chargerId}
                          value={ch.chargerId}
                        >
                          {ch.chargerNumber} ({ch.chargerType}) – {ch.powerRating}KW
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Booking Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <input
                      type="text"
                      className="form-control"
                      value="BOOKED"
                      disabled
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100 mt-2"
                  >
                    Confirm Booking
                  </button>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Booking;
