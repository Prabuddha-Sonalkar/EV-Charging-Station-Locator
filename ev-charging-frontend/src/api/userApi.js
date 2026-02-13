import api from "./axios";

// GET all users (for login)
export const getAllUsers = () => {
  return api.get("/users");
};

// REGISTER user
export const registerUser = (user) => {
  return api.post("/users", user);
};
