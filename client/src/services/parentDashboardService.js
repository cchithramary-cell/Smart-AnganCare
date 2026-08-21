import axios from "axios";

const API = "http://localhost:5000/api/parent";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

// Dashboard
export const getDashboard = () => {
  return axios.get(`${API}/dashboard`, getConfig());
};

// Child Details
export const getMyChild = () => {
  return axios.get(`${API}/child`, getConfig());
};

// Attendance
export const getMyAttendance = () => {
  return axios.get(`${API}/attendance`, getConfig());
};

// Growth
export const getMyGrowth = () => {
  return axios.get(`${API}/growth`, getConfig());
};

// Nutrition
export const getMyNutrition = () => {
  return axios.get(`${API}/nutrition`, getConfig());
};

// Vaccination
export const getMyVaccination = () => {
  return axios.get(`${API}/vaccination`, getConfig());
};

// Reports
export const getMyReports = () => {
  return axios.get(`${API}/reports`, getConfig());
};
