import axiosInstance from "./axios";

const fetchAllUsers = (page) => {
  return axiosInstance.get(`/api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
  return axiosInstance.post("/api/users", { name, job });
};

const updateUser = (userId, name, job) => {
  return axiosInstance.put(`/api/users/${userId}`, { name, job });
};
const deleteUser = (userId) => {
  return axiosInstance.delete(`/api/users/${userId}`);
};
const loginUser = (email, password) => {
  return axiosInstance.post("/api/login", { email, password });
};

export { postCreateUser, fetchAllUsers, updateUser, deleteUser, loginUser };
