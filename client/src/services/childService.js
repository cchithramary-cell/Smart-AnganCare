import axios from "axios";

const API = "http://localhost:5000/api/children";

const getToken = () => {
  return localStorage.getItem("token");
};

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

// ===========================
// Get All Children
// ===========================
export const getChildren = async () => {
  return await axios.get(API, config());
};

// ===========================
// Get Child By ID
// ===========================
export const getChild = async (id) => {
  return await axios.get(`${API}/${id}`, config());
};

// ===========================
// Add Child
// ===========================
export const addChild = async (childData) => {
  return await axios.post(API, childData, config());
};

// ===========================
// Update Child
// ===========================
export const updateChild = async (id, childData) => {
  return await axios.put(`${API}/${id}`, childData, config());
};

// ===========================
// Delete Child
// ===========================
export const deleteChild = async (id) => {
  return await axios.delete(`${API}/${id}`, config());
};
