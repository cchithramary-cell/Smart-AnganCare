import api from "./api";
export const getGrowthStats = async () => {
  return await api.get("/analytics/growth");
};
export const getDashboardStats = async () => {
  const response = await api.get("/analytics/dashboard");

  return response;
};
export const getNutritionStats = async () => {
  return await api.get("/analytics/nutrition");
};
export const getVaccinationStats = async () => {
  return await api.get("/analytics/vaccination");
};
