import axios from "axios";

const API_BASE_URL = "http://localhost:9091/api/stations";

/**
 * Fetch all APPROVED charging stations
 */
export const getApprovedStations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/approved`);
    return response.data;
  } catch (error) {
    console.error("Error fetching approved stations:", error);
    return [];
  }
};
