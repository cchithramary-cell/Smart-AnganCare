import api from "./api";

export const getNutrition = () => {
  return api.get("/nutrition");
};

export const getNutritionById = (id) => {
  return api.get(`/nutrition/${id}`);
};

export const addNutrition = (data) => {
  return api.post("/nutrition", data);
};

export const updateNutrition = (id, data) => {
  return api.put(`/nutrition/${id}`, data);
};

export const deleteNutrition = (id) => {
  return api.delete(`/nutrition/${id}`);
};
