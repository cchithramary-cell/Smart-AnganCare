import api from "./api";

export const getAttendanceRecords = () => {
  return api.get("/attendance");
};

export const getAttendanceRecord = (id) => {
  return api.get(`/attendance/${id}`);
};

export const addAttendanceRecord = (attendanceData) => {
  return api.post("/attendance", attendanceData);
};

export const updateAttendanceRecord = (id, attendanceData) => {
  return api.put(`/attendance/${id}`, attendanceData);
};

export const deleteAttendanceRecord = (id) => {
  return api.delete(`/attendance/${id}`);
};
