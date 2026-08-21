import axios from "axios";

const API = "http://localhost:5000/api/reports";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getChildReport = (childId) => {
  return axios.get(`${API}/child/${childId}`, getConfig());
};

export const getGrowthReport = (childId) => {
  return axios.get(`${API}/growth/${childId}`, getConfig());
};

export const getAttendanceReport = (childId) => {
  return axios.get(`${API}/attendance/${childId}`, getConfig());
};

export const getNutritionReport = (childId) => {
  return axios.get(`${API}/nutrition/${childId}`, getConfig());
};

export const getVaccinationReport = (childId) => {
  return axios.get(`${API}/vaccination/${childId}`, getConfig());
};

export const downloadPDF = (childId) => {
  return axios.get(`${API}/pdf/${childId}`, {
    ...getConfig(),
    responseType: "blob",
  });
};
