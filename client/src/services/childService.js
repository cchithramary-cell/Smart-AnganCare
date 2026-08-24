import api from "./api";

export const getChildren = async () => {
  return await api.get("/children");
};

export const getChild = async (id) => {
  return await api.get(`/children/${id}`);
};

export const addChild = async (childData) => {
  return await api.post("/children", childData);
};

export const updateChild = async (id, childData) => {
  return await api.put(`/children/${id}`, childData);
};

export const deleteChild = async (id) => {
  return await api.delete(`/children/${id}`);
};
