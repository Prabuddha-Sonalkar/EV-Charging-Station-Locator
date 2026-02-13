import { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getApprovedStations } from "../api/stationApi";

// ===== Leaflet Marker Fix =====
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_LOCATION = [18.5204, 73.8567];
const MAX_RANGE_KM = 20;

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -28],
});

const customLocationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -28],
  className: 'custom-location-icon',
});

const stationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -25],
});

// ===== BULLETPROOF ROUTING - OSRM + PERFECT CLEANUP =====
function Routing({ start, end }) {
  const map = useMap();
  const routeLayerRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    // IMMEDIATE CLEANUP OF ALL PREVIOUS ROUTES
    if (routeLayerRef.current && map.hasLayer(routeLayerRef.current)) {
      map.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }

    const fetchRealTimeRoute = async () => {
      try {
        // Use OSRM for FREE real road routes
        const query = new URLSearchParams({
          alternatives: 'false',
          steps: 'false',
          overview: 'full',
          geometries: 'geojson'
        });

        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?${query}`
        );

        if (!response.ok || !isMountedRef.current) return;

        const data = await response.json();
        if (!data.routes || data.routes.length === 0 || !isMountedRef.current) return;

        const route = data.routes[0];

        // FORCE CLEAR ANY EXISTING ROUTE
        if (routeLayerRef.current && map.hasLayer(routeLayerRef.current)) {
          map.removeLayer(routeLayerRef.current);
        }

        // Create PERFECTLY CLEAN new route
        const coordinates = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

        routeLayerRef.current = L.polyline(coordinates, {
          color: "#007bff",
          weight: 8,
          opacity: 0.9,
          smoothFactor: 1
        }).addTo(map);

        if (isMountedRef.current) {
          map.fitBounds(routeLayerRef.current.getBounds(), {
            padding: [50, 50],
            animate: true,
            duration: 1
          });
        }

      } catch (error) {
        console.warn('Real route failed, using straight line');
        if (!isMountedRef.current) return;

        // PERFECT FALLBACK - STRAIGHT LINE
        const coords = [[start[0], start[1]], [end[0], end[1]]];
        routeLayerRef.current = L.polyline(coords, {
          color: "#007bff",
          weight: 6,
          opacity: 0.8,
          dashArray: "15, 10"
        }).addTo(map);

        map.fitBounds(routeLayerRef.current.getBounds(), { padding: [40, 40] });
      }
    };

    // 100ms delay for perfect cleanup
    const timeoutId = setTimeout(fetchRealTimeRoute, 100);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timeoutId);

      // BULLETPROOF CLEANUP
      if (routeLayerRef.current && map) {
        try {
          if (map.hasLayer(routeLayerRef.current)) {
            map.removeLayer(routeLayerRef.current);
          }
          routeLayerRef.current = null;
        } catch (e) {
          console.warn('Cleanup ignored');
        }
      }
    };
  }, [start, end, map]);

  return null;
}

//  MAP CLICK HANDLER 
function MapClickHandler({ onLocationSet }) {
  const map = useMap();
  useEffect(() => {
    const handleMapClick = (e) => onLocationSet([e.latlng.lat, e.latlng.lng]);
    map.on('click', handleMapClick);
    return () => map.off('click', handleMapClick);
  }, [map, onLocationSet]);
  return null;
}

function Map() {
  const navigate = useNavigate();
  const mapRef = useRef(null); // NEW: Map reference for centering
  const [userLocation, setUserLocation] = useState(null);
  const [customLocation, setCustomLocation] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [nearestStations, setNearestStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [navigateToStation, setNavigateToStation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [locationMode, setLocationMode] = useState('user');
  const routeKey = useRef(0);

  const fetchUserLocation = useCallback(() =>
    new Promise((resolve) => {
      if (!navigator.geolocation) resolve(DEFAULT_LOCATION);
      else
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve([pos.coords.latitude, pos.coords.longitude]),
          () => resolve(DEFAULT_LOCATION)
        );
    }), []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const location = await fetchUserLocation();
      setUserLocation(location);
      setActiveLocation(location);
      try {
        const approvedStations = await getApprovedStations();
        const parsed = (approvedStations || []).map(st => ({
          ...st, latitude: Number(st.latitude), longitude: Number(st.longitude)
        }));
        setStations(parsed);
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    loadData();
  }, [fetchUserLocation]);

  useEffect(() => {
    if (customLocation) {
      setActiveLocation(customLocation);
      setLocationMode('custom');
    } else if (userLocation) {
      setActiveLocation(userLocation);
      setLocationMode('user');
    }
  }, [customLocation, userLocation]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const handleClearRoute = useCallback(() => {
    setShowRoute(false);
    setNavigateToStation(null);
    routeKey.current = 0;
  }, []);

  const handleFindNearest = () => {
    if (!activeLocation) return;
    handleClearRoute();

    const inRange = stations
      .map(st => ({ ...st, distance: getDistance(activeLocation[0], activeLocation[1], st.latitude, st.longitude) }))
      .filter(st => st.distance <= MAX_RANGE_KM)
      .sort((a, b) => a.distance - b.distance);

    if (inRange.length === 0) {
      alert(`No stations within ${MAX_RANGE_KM}km`);
      setNearestStations([]);
      return;
    }
    setNearestStations(inRange.slice(0, 10));
  };

  const handleMapClick = (location) => {
    setCustomLocation(location);
    setNearestStations([]);
    handleClearRoute();
  };

  // ⭐ NEW: Reset Location with MAP CENTERING ⭐
  const handleResetLocation = useCallback(() => {
    setCustomLocation(null);
    setNearestStations([]);
    handleClearRoute();
    
    // CENTER MAP ON USER LOCATION
    if (userLocation && mapRef.current) {
      mapRef.current.setView(userLocation, 13, {
        animate: true,
        duration: 1
      });
    }
  }, [userLocation, handleClearRoute]);

  const handleNavigate = (station) => {
    if (navigateToStation?.stationId === station.stationId) {
      handleClearRoute();
      return;
    }

    setShowRoute(false);
    setNavigateToStation(null);
    routeKey.current += 1;

    setTimeout(() => {
      setNavigateToStation(station);
      setShowRoute(true);
    }, 150);
  };

  if (loading) return <div className="text-center mt-5"><h5>📍 Loading EV Map...</h5></div>;

  return (
    <>
      <style jsx>{`
        .custom-location-icon img { filter: hue-rotate(200deg) saturate(2); }
        .leaflet-container { cursor: crosshair !important; }
      `}</style>

      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container-fluid flex-grow-1 p-0">
          <div className="row g-0">
            {/* SIDEBAR */}
            <div className="col-md-4 col-lg-3 bg-white p-3 border-end" style={{ height: "85vh", overflowY: "auto" }}>
              <h5 className="fw-bold mb-3">EV Finder</h5>

              <div className="mb-3 p-2 bg-light rounded">
                <div className="d-flex justify-content-between mb-1">
                  <small>Location Mode:</small>
                  <span className={`badge ${locationMode === 'user' ? 'bg-success' : 'bg-warning'}`}>
                    {locationMode === 'user' ? 'GPS' : 'Manual'}
                  </span>
                </div>
                {customLocation && (
                  <button className="btn btn-outline-secondary btn-sm w-100" onClick={handleResetLocation}>
                    Reset to GPS
                  </button>
                )}
              </div>

              <button className="btn btn-success w-100 mb-3" onClick={handleFindNearest}>
                🔍 Find Nearest Stations
              </button>

              {/* INSTRUCTION BELOW BUTTON */}
              <div className="alert alert-info small mb-3 p-2" style={{ fontSize: '0.85rem' }}>
                <i className="fas fa-mouse-pointer me-1"></i>
                Click anywhere on map for custom location
              </div>

              {showRoute && (
                <button className="btn btn-outline-danger w-100 mb-3" onClick={handleClearRoute}>
                  ❌ Clear Route
                </button>
              )}

              {nearestStations.map((st) => (
                <div key={st.stationId} className={`card mb-3 border-0 shadow-sm ${navigateToStation?.stationId === st.stationId ? 'border-primary border-2 bg-primary-subtle' : 'bg-light'}`}>
                  <div className="card-body">
                    <h6 className="fw-bold">{st.stationName}</h6>
                    <p className="small text-muted mb-2">{st.address}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary">{st.distance.toFixed(2)} km</span>
                      <div className="d-flex gap-1">
                        <button className="btn btn-outline-success btn-sm" onClick={() => navigate('/booking', { state: { station: st } })}>Book</button>
                        <button className={`btn btn-sm ${navigateToStation?.stationId === st.stationId ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleNavigate(st)}>
                          {navigateToStation?.stationId === st.stationId ? 'Active' : 'Navigate'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* MAP AREA */}
            <div className="col-md-8 col-lg-9">
              <MapContainer 
                ref={mapRef} // ⭐ MAP REF FOR CENTERING ⭐
                center={activeLocation || DEFAULT_LOCATION} 
                zoom={13} 
                style={{ height: "85vh", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler onLocationSet={handleMapClick} />

                {userLocation && locationMode === 'user' && (
                  <Marker position={userLocation} icon={userIcon}>
                    <Popup>You are here</Popup>
                  </Marker>
                )}

                {customLocation && (
                  <Marker position={customLocation} icon={customLocationIcon}>
                    <Popup>Custom Location</Popup>
                  </Marker>
                )}

                {nearestStations.map((st) => (
                  <Marker key={st.stationId} position={[st.latitude, st.longitude]} icon={stationIcon}>
                    <Popup><strong>{st.stationName}</strong><br/>{st.address}</Popup>
                  </Marker>
                ))}

                {showRoute && navigateToStation && activeLocation && (
                  <Routing
                    key={`${routeKey.current}-${navigateToStation.stationId}`}
                    start={activeLocation}
                    end={[navigateToStation.latitude, navigateToStation.longitude]}
                  />
                )}
              </MapContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Map;
