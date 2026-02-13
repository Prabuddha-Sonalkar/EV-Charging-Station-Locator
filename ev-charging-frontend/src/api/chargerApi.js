import api from "./axios";

export const getChargersByStation = (stationId) =>
  api.get(`/chargers/station/${stationId}`);

export const addCharger = (charger) =>
  api.post("/chargers", charger);

export const deleteCharger = (chargerId) =>
  api.delete(`/chargers/${chargerId}`);
