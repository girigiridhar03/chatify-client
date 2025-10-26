import axios from "axios";
import { toast } from "react-toastify";

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
    if (
      error.response &&
      error.response.status === 401 &&
      error?.config?.url !== "/auth/signin"
    ) {
      toast.success("Unauthorized: redirecting to signin...");
      console.warn("Unauthorized: redirecting to signin...");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 3000);
    }
    return Promise.resolve(error);
  }
);

export default API;
