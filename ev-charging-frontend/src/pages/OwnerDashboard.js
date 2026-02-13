import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getOwnerStations,
  addStationForOwner
} from "../api/ownerApi";

import {
  getChargersByStation,
  addCharger,
  deleteCharger
} from "../api/chargerApi";

function OwnerDashboard() {

  // ✅ AUTH (DO NOT TOUCH CUSTOMER)
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const ownerId = loggedUser?.userId;
  const isOwner = loggedUser?.roleId === 2;

  const [stations, setStations] = useState([]);
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [chargers, setChargers] = useState([]);

  const [newCharger, setNewCharger] = useState({
    chargerNumber: "",
    chargerType: "",
    powerRating: ""
  });

  const [newStation, setNewStation] = useState({
    stationName: "",
    address: "",
    city: "",
    state: "",
    latitude: "",
    longitude: ""
  });

  // ==============================
  // LOAD CHARGERS
  // ==============================
  const loadChargers = useCallback((stationId) => {
    if (!stationId) return;

    getChargersByStation(stationId)
      .then(res => setChargers(res.data || []))
      .catch(() => setChargers([]));
  }, []);

  // ==============================
  // LOAD STATIONS
  // ==============================
  const loadStations = useCallback(() => {
    if (!ownerId) return;

    getOwnerStations(ownerId).then(res => {
      const data = res.data || [];
      setStations(data);

      if (data.length > 0) {
        setSelectedStationId(data[0].stationId);
        loadChargers(data[0].stationId);
      } else {
        setSelectedStationId(null);
        setChargers([]);
      }
    });
  }, [ownerId, loadChargers]);

  useEffect(() => {
    if (isOwner) {
      loadStations();
    }
  }, [isOwner, loadStations]);

  // ⛔ AUTH GUARD (AFTER HOOKS)
  if (!loggedUser || !isOwner) {
    return <h4 className="text-center mt-5">Unauthorized</h4>;
  }

  const selectedStation = stations.find(
    s => s.stationId === selectedStationId
  );

  // ==============================
  // HANDLERS
  // ==============================
  const handleStationChange = (e) => {
    const id = Number(e.target.value);
    setSelectedStationId(id);
    loadChargers(id);
  };

  const handleAddStation = (e) => {
    e.preventDefault();

    addStationForOwner(ownerId, newStation).then(() => {
      setNewStation({
        stationName: "",
        address: "",
        city: "",
        state: "",
        latitude: "",
        longitude: ""
      });
      loadStations();
    });
  };

  const handleAddCharger = (e) => {
    e.preventDefault();
    if (!selectedStationId) return;

    const payload = {
      ...newCharger,
      availabilityStatus: "FREE",
      station: { stationId: selectedStationId }
    };

    addCharger(payload).then(() => {
      setNewCharger({
        chargerNumber: "",
        chargerType: "",
        powerRating: ""
      });
      loadChargers(selectedStationId);
    });
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <div className="container flex-grow-1 py-4">
        <h2 className="fw-bold mb-4">Owner Dashboard</h2>

        {/* ADD STATION */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Add Charging Station</h5>

            <form onSubmit={handleAddStation} className="row g-3">
              {Object.keys(newStation).map((key) => (
                <div key={key} className="col-md-6">
                  <input
                    className="form-control"
                    placeholder={key}
                    value={newStation[key]}
                    onChange={(e) =>
                      setNewStation({ ...newStation, [key]: e.target.value })
                    }
                    required
                  />
                </div>
              ))}
              <div className="col-12">
                <button className="btn btn-primary w-100">
                  Add Station
                </button>
              </div>
            </form>
          </div>
        </div>

        {stations.length > 0 && (
          <>
            {/* STATION SELECT */}
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Select Station</h5>
                <select
                  className="form-select"
                  value={selectedStationId || ""}
                  onChange={handleStationChange}
                >
                  {stations.map((st) => (
                    <option key={st.stationId} value={st.stationId}>
                      {st.stationName} — {st.city} ({st.approvalStatus})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ADD CHARGER (ONLY APPROVED) */}
            {selectedStation?.approvalStatus === "APPROVED" && (
              <>
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Add Charger</h5>

                    <form onSubmit={handleAddCharger} className="row g-3">
                      <input
                        className="form-control"
                        placeholder="Charger Number"
                        value={newCharger.chargerNumber}
                        onChange={(e) =>
                          setNewCharger({
                            ...newCharger,
                            chargerNumber: e.target.value
                          })
                        }
                        required
                      />
                      <input
                        className="form-control"
                        placeholder="Charger Type"
                        value={newCharger.chargerType}
                        onChange={(e) =>
                          setNewCharger({
                            ...newCharger,
                            chargerType: e.target.value
                          })
                        }
                        required
                      />
                      <input
                        className="form-control"
                        placeholder="Power Rating"
                        value={newCharger.powerRating}
                        onChange={(e) =>
                          setNewCharger({
                            ...newCharger,
                            powerRating: e.target.value
                          })
                        }
                        required
                      />
                      <button className="btn btn-success">
                        Add Charger
                      </button>
                    </form>
                  </div>
                </div>

                {/* CHARGER TABLE */}
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Chargers</h5>

                    {chargers.length === 0 ? (
                      <p className="text-muted">No chargers available</p>
                    ) : (
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Number</th>
                            <th>Type</th>
                            <th>Power</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {chargers.map((ch) => (
                            <tr key={ch.chargerId}>
                              <td>{ch.chargerId}</td>
                              <td>{ch.chargerNumber}</td>
                              <td>{ch.chargerType}</td>
                              <td>{ch.powerRating}</td>
                              <td>{ch.availabilityStatus}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() =>
                                    deleteCharger(ch.chargerId).then(() =>
                                      loadChargers(selectedStationId)
                                    )
                                  }
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default OwnerDashboard;
