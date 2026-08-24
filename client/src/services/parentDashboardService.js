import api from "./api";

// Dashboard
export const getDashboard = () => {
  return api.get("/parent/dashboard");
};

// Child Details
export const getMyChild = () => {
  return api.get("/parent/child");
};

// Attendance
export const getMyAttendance = () => {
  return api.get("/parent/attendance");
};

// Growth
export const getMyGrowth = () => {
  return api.get("/parent/growth");
};

// Nutrition
export const getMyNutrition = () => {
  return api.get("/parent/nutrition");
};

// Vaccination
export const getMyVaccination = () => {
  return api.get("/parent/vaccination");
};

// Reports
export const getMyReports = () => {
  return api.get("/parent/reports");
};
