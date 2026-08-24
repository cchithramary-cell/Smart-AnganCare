import api from "./api";

// Get all growth records
export const getGrowthRecords = () => {
  return api.get("/growth");
};

// Get growth record by ID
export const getGrowthRecord = (id) => {
  return api.get(`/growth/${id}`);
};

// Add growth record
export const addGrowthRecord = (growthData) => {
  return api.post("/growth", growthData);
};

// Update growth record
export const updateGrowthRecord = (id, growthData) => {
  return api.put(`/growth/${id}`, growthData);
};

// Delete growth record
export const deleteGrowthRecord = (id) => {
  return api.delete(`/growth/${id}`);
};
