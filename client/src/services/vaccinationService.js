import api from "./api";

export const getVaccinations = () => {
  return api.get("/vaccinations");
};

export const getVaccination = (id) => {
  return api.get(`/vaccinations/${id}`);
};

export const addVaccination = (data) => {
  return api.post("/vaccinations", data);
};

export const updateVaccination = (id, data) => {
  return api.put(`/vaccinations/${id}`, data);
};

export const deleteVaccination = (id) => {
  return api.delete(`/vaccinations/${id}`);
};
