import axios from "axios";

// Base Axios instance
const adminApi = axios.create({
  baseURL: "https://localhost:7028/api/admin", // Your .NET admin backend
  headers: { "Content-Type": "application/json" }
});

// Attach JWT token automatically
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ ADMIN LOGIN
export const adminLogin = (data) =>
  adminApi.post("/login", data).then(res => res.data);

// ✅ GET PENDING STATIONS
export const getPendingStations = () =>
  adminApi.get("/stations/pending").then(res => res.data);

// ✅ GET ALL STATIONS
export const getAllStations = () =>
  adminApi.get("/stations/all").then(res => res.data);

// ✅ APPROVE STATION
export const approveStation = (id) =>
  adminApi.put(`/stations/${id}/approve`);

// ✅ REJECT STATION
export const rejectStation = (id) =>
  adminApi.put(`/stations/${id}/reject`);

export default adminApi;


