import api from "./axios";

export const registerUser = async (payload) => {
  const response = await api.post("/user/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post("/user/login", payload);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await api.put("/user/profile", payload);
  return response.data;
};
