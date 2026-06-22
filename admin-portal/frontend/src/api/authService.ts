import apiClient from "./apiClient";

export const loginUser = async (email: string, password: string) => {
  const res = await apiClient.post("auth/login/", {
    email,
    password,
  });

  return res.data;
};

export const getProfile = async () => {
  const res = await apiClient.get("auth/profile/");
  return res.data;
};