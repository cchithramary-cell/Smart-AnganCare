import api from "./api";

export const getGrowthRecords = () => {
  return api.get("/growth");
};

export const getGrowthRecord = (id) => {
  return api.get(`/growth/${id}`);
};

export const addGrowthRecord = (growthData) => {
  return api.post("/growth", growthData);
};

export const updateGrowthRecord = (id, growthData) => {
  return api.put(`/growth/${id}`, growthData);
};

export const deleteGrowthRecord = (id) => {
  return api.delete(`/growth/${id}`);
};
