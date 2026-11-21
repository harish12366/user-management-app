
import axios from "axios";

const API = axios.create({
  baseURL:
    "https://6b0200d34a8cad87bd8f724d.mockapi.io/api/v1",
});

// GET users
export const getUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};

// POST user
export const createUser = async (user) => {
  const response = await API.post("/users", user);
  return response.data;
};

// PUT user
export const updateUser = async (id, user) => {
  const response = await API.put(`/users/${id}`, user);
  return response.data;
};

// DELETE user
export const deleteUser = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};
