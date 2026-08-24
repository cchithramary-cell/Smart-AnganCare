import api from "./api";

export const getParents = () => api.get("/parents");

export const getParent = (id) => api.get(`/parents/${id}`);

export const addParent = (data) => api.post("/parents", data);

export const updateParent = (id, data) => api.put(`/parents/${id}`, data);

export const deleteParent = (id) => api.delete(`/parents/${id}`);
