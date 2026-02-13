import api from "./axios";

export const startChargingSession = (bookingId) => {
  return api.post(`/sessions/start/${bookingId}`);
};

export const endChargingSession = (sessionId) => {
  return api.post(`/sessions/end/${sessionId}`);
};

export const getAllChargingSessions = () => {
  return api.get("/sessions");
};
