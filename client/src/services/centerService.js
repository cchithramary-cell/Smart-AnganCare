import axios from "axios";

const API = "http://localhost:5000/api/centers";

const config = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export const getCenters = () => axios.get(API, config());

export const getCenter = (id) => axios.get(`${API}/${id}`, config());

export const addCenter = (data) => axios.post(API, data, config());

export const updateCenter = (id, data) =>
  axios.put(`${API}/${id}`, data, config());

export const deleteCenter = (id) => axios.delete(`${API}/${id}`, config());

