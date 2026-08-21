import axios from "axios";

const API = "http://localhost:5000/api/attendance";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export const getAttendanceRecords = () => {
  return axios.get(API, getConfig());
};

export const getAttendanceRecord = (id) => {
  return axios.get(`${API}/${id}`, getConfig());
};

export const addAttendanceRecord = (attendanceData) => {
  return axios.post(API, attendanceData, getConfig());
};

export const updateAttendanceRecord = (id, attendanceData) => {
  return axios.put(`${API}/${id}`, attendanceData, getConfig());
};

export const deleteAttendanceRecord = (id) => {
  return axios.delete(`${API}/${id}`, getConfig());
};
