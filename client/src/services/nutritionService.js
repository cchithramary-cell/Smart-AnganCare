import axios from "axios";

const API = "http://localhost:5000/api/nutrition";

const config = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export const getNutrition = () =>
  axios.get(API, config());

export const getNutritionById = (id) =>
  axios.get(`${API}/${id}`, config());

export const addNutrition = (data) =>
  axios.post(API, data, config());

export const updateNutrition = (id, data) =>
  axios.put(`${API}/${id}`, data, config());

export const deleteNutrition = (id) =>
    axios.delete(`${API}/${id}`, config());
