import api from "./api";

export const getCenters = () => api.get("/centers");

export const getCenter = (id) => api.get(`/centers/${id}`);

export const addCenter = (data) => api.post("/centers", data);

export const updateCenter = (id, data) => api.put(`/centers/${id}`, data);

export const deleteCenter = (id) => api.delete(`/centers/${id}`);
