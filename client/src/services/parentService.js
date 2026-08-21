import axios from "axios";

const API = "http://localhost:5000/api/parents";

const config = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

// Get All Parents
export const getParents = () => axios.get(API, config());

// Get Parent
export const getParent = (id) => axios.get(`${API}/${id}`, config());

// Add Parent
export const addParent = (data) => axios.post(API, data, config());

// Update Parent
export const updateParent = (id, data) =>
  axios.put(`${API}/${id}`, data, config());

// Delete Parent
export const deleteParent = (id) => axios.delete(`${API}/${id}`, config());
