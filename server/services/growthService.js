const axios = require("axios");

const API = "http://localhost:5000/api/growth";

const config = () => {
  const headers = { "Content-Type": "application/json" };

  if (process.env.API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.API_TOKEN}`;
  }

  return { headers };
};

const getGrowthRecords = () => axios.get(API, config());

const getGrowthRecord = (id) => axios.get(`${API}/${id}`, config());

const addGrowthRecord = (data) => axios.post(API, data, config());

const updateGrowthRecord = (id, data) =>
  axios.put(`${API}/${id}`, data, config());

const deleteGrowthRecord = (id) => axios.delete(`${API}/${id}`, config());

module.exports = {
  getGrowthRecords,
  getGrowthRecord,
  addGrowthRecord,
  updateGrowthRecord,
  deleteGrowthRecord,
};
