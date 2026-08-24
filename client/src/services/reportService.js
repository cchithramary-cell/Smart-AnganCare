import api from "./api";

export const getChildReport = (childId) => {
  return api.get(`/reports/child/${childId}`);
};

export const getGrowthReport = (childId) => {
  return api.get(`/reports/growth/${childId}`);
};

export const getAttendanceReport = (childId) => {
  return api.get(`/reports/attendance/${childId}`);
};

export const getNutritionReport = (childId) => {
  return api.get(`/reports/nutrition/${childId}`);
};

export const getVaccinationReport = (childId) => {
  return api.get(`/reports/vaccination/${childId}`);
};

export const downloadPDF = (childId) => {
  return api.get(`/reports/pdf/${childId}`, {
    responseType: "blob",
  });
};
