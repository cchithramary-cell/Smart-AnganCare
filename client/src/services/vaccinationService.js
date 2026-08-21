import axios from "axios";

const API = "http://localhost:5000/api/vaccinations";

const config = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export const getVaccinations = () => axios.get(API, config());

export const getVaccination = (id) => axios.get(`${API}/${id}`, config());

export const addVaccination = (data) => axios.post(API, data, config());

export const updateVaccination = (id, data) =>
  axios.put(`${API}/${id}`, data, config());

export const deleteVaccination = (id) => axios.delete(`${API}/${id}`, config());
