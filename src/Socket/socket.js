import { io } from "socket.io-client";

let socket = null;

export const initSocket = (token) => {
  if (socket && socket.connected) return socket;

  socket = io("https://robo-zv8u.onrender.com", {
    auth: { token },
    transports: ["websocket"],
  });

  return socket;
};

export const getSocket = () => socket;
