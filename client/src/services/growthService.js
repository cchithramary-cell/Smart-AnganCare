import axios from "axios";

const API = "http://localhost:5000/api/growth";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export const getGrowthRecords = () => {
  return axios.get(API, getConfig());
};

export const getGrowthRecord = (id) => {
  return axios.get(`${API}/${id}`, getConfig());
};

export const addGrowthRecord = (growthData) => {
  return axios.post(API, growthData, getConfig());
};

export const updateGrowthRecord = (id, growthData) => {
  return axios.put(`${API}/${id}`, growthData, getConfig());
};

export const deleteGrowthRecord = (id) => {
  return axios.delete(`${API}/${id}`, getConfig());
};
