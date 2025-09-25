import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized: redirecting to signin...");
      window.location.href = "/signin";
    }
    return Promise.resolve(error);
  }
);

export default API;
