import { io } from "socket.io-client";
const url =
  import.meta.env.VITE_ENV_URL === "local"
    ? "http://localhost:8080"
    : "https://chatify-server-cit8.onrender.com";
export const socket = io(url, {
  transports: ["websocket"],
});
