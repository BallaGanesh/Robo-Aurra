import { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { SocketContext } from "../Socket/SocketProvider";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { socket } = useContext(SocketContext);

  // Load saved notifications from localStorage
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("global_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage on every update
  useEffect(() => {
    localStorage.setItem("global_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Add a new notification to global list
  const addNotification = (notif) => {
    setNotifications((prev) => [notif, ...prev]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Listen to socket follow request events globally
  useEffect(() => {
    if (!socket) return;

    console.log("🔔 Global Notification Listener Active");

    // 1️⃣ Follow Request Received
    socket.on("followRequestReceived", (data) => {
      console.log("🔥 Global: followRequestReceived:", data);

      addNotification({
        id: Date.now(),
        type: "follow",
        followerId: data.fromId,
        user: {
          name: data.from,
          username: data.from,
          avatar: "/default-avatar.png",
        },
        action: "sent you a follow request",
        timestamp: "Just now",
        isNew: true,
      });
    });

    // 2️⃣ Follow Request Accepted
    socket.on("followRequestAccepted", (data) => {
      addNotification({
        id: Date.now(),
        type: "accept",
        user: {
          name: data.by,
          username: data.by,
          avatar: "/default-avatar.png",
        },
        action: "accepted your follow request",
        timestamp: "Just now",
        isNew: true,
      });
    });

    // 3️⃣ Follow Request Rejected
    socket.on("followRequestRejected", (data) => {
      addNotification({
        id: Date.now(),
        type: "reject",
        user: {
          name: data.by,
          username: data.by,
          avatar: "/default-avatar.png",
        },
        action: "rejected your follow request",
        timestamp: "Just now",
        isNew: true,
      });
    });

    return () => {
      socket.off("followRequestReceived");
      socket.off("followRequestAccepted");
      socket.off("followRequestRejected");
    };
  }, [socket]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
