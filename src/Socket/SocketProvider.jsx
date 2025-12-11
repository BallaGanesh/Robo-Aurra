// import React, { createContext, useEffect, useState } from "react";
// import { initSocket } from "./socket";

// export const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const authData = JSON.parse(localStorage.getItem("user"));
//   const user = authData?.user || null;

//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (!user?._id) {
//       console.log("❌ No user ID — socket not connecting.");
//       return;
//     }

//     console.log("🔍 SocketProvider user:", user);

//     const token = localStorage.getItem("token");
//     const s = initSocket(token);

//     s.on("connect", () => {
//       console.log("🔌 Socket connected:", s.id);
//     });

//     s.emit("register", user._id);

//     setSocket(s);
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

import React, { createContext, useEffect, useState } from "react";
import { initSocket } from "./socket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Watch for login changes
  useEffect(() => {
    const interval = setInterval(() => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser?._id !== user?._id) {
        setUser(savedUser);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [user]);

  // Connect socket when user becomes available
  useEffect(() => {
    if (!user?._id) {
      console.log("❌ No user ID — socket not connecting.");
      return;
    }

    console.log("🔍 SocketProvider user:", user);

    const token = localStorage.getItem("token");
    const s = initSocket(token);

    s.on("connect", () => {
      console.log("🔌 Socket connected:", s.id);
    });

    s.emit("register", user._id);
    setSocket(s);

    return () => s.disconnect();
  }, [user]); // 🔥 Reconnect when user changes (after login)

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
