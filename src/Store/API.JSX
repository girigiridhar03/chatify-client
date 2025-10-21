import axios from "axios";

const url =
  import.meta.env.VITE_ENV_URL === "local"
    ? "http://localhost:8080/api"
    : "https://chatify-server-cit8.onrender.com/api";
const API = axios.create({
  baseURL: url,
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
