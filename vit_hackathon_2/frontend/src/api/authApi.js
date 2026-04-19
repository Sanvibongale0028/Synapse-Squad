import { apiFetch } from "./http";

export const loginUser = async (data) => {
  return apiFetch("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const signupUser = async (data) => {
  return apiFetch("/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
