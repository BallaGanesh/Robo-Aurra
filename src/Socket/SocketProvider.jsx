

import React, { createContext, useEffect, useState } from "react";
import { initSocket } from "./socket";
import { useSelector } from "react-redux";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const {user,token} = useSelector((state)=>state.Auth);

  const [socket, setSocket] = useState(null);
  
  // Connect socket when user becomes available
  useEffect(() => {
    if (!user?._id||!token) {
      console.log("❌ No user ID — socket not connecting.");
      return;
    }

    console.log("🔍 SocketProvider user:", user);
    const s = initSocket(token);

    s.on("connect", () => {
      console.log("🔌 Socket connected:", s.id);
    });

    s.emit("register", user._id);
    setSocket(s);

    return () => s.disconnect();
  }, [user?._id,token]); // 🔥 Reconnect when user changes (after login)

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
