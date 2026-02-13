
// import axios from "axios";

// // Spring Boot backend is HTTP on port 9091
// const api = axios.create({
//   baseURL: "http://localhost:9091/api", // <-- changed https -> http
//   headers: { "Content-Type": "application/json" }
// });

// export default api;

// // ✅ Owner fetches his stations
// export const getOwnerStations = (ownerId) =>
//   api.get(`/stations/owner/${ownerId}`);

// // ✅ Owner adds station (approval PENDING)
// export const addStationForOwner = (ownerId, station) =>
//   api.post(`/stations/owner/${ownerId}`, station);

import axios from "axios";

// Spring Boot backend
const api = axios.create({
  baseURL: "http://localhost:9091/api",
  headers: { "Content-Type": "application/json" }
});

export default api;

// Owner fetches his stations
export const getOwnerStations = (ownerId) =>
  api.get(`/stations/owner/${ownerId}`);

// Owner adds station (approval PENDING)
export const addStationForOwner = (ownerId, station) =>
  api.post(`/stations/owner/${ownerId}`, station);

// ✅ Owner deletes his station
export const deleteStation = (stationId) =>
  api.delete(`/stations/${stationId}`);
