import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { SocketContext } from "../Socket/SocketProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";

export const NotificationContext = createContext();
dayjs.extend(relativeTime);

export const NotificationProvider = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const user = useSelector((state) => state.Auth.user);

  // 🔑 stable storage key
  const storageKey = user?._id ? `notifications_${user._id}` : null;

  // 🔔 notifications
  const [notifications, setNotifications] = useState([]);

  // 🔄 reload on user change
  useEffect(() => {
    if (!storageKey) {
      setNotifications([]);
      return;
    }
    const saved = localStorage.getItem(storageKey);
    setNotifications(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  // 💾 persist per user
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(notifications));
  }, [notifications, storageKey]);

  // 🔍 resolve user
  const resolveUserFromId = useCallback(
    (userId) => {
      if (!userId || !user) {
        return {
          name: "Unknown User",
          username: "unknown",
          avatar: "/default-avatar.png",
        };
      }

      if (String(user._id) === String(userId)) {
        return {
          name: user.username,
          username: user.username,
          avatar: user.profilePhoto
            ? `data:image/jpeg;base64,${user.profilePhoto}`
            : "/default-avatar.png",
        };
      }

      const found =
        user.followers?.find((u) => String(u._id) === String(userId)) ||
        user.following?.find((u) => String(u._id) === String(userId));

      if (found) {
        return {
          name: found.username,
          username: found.username,
          avatar: found.profilePhoto
            ? `data:image/jpeg;base64,${found.profilePhoto}`
            : "/default-avatar.png",
        };
      }

      return {
        name: "Unknown User",
        username: "unknown",
        avatar: "/default-avatar.png",
      };
    },
    [user]
  );

  const addNotification = useCallback((notif) => {
    setNotifications((prev) => [notif, ...prev]);
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // 🔔 popup
  const [popup, setPopup] = useState(null);
  const showPopup = (notif) => {
    setPopup(notif);
    setTimeout(() => setPopup(null), 6000);
  };

  // 🔌 SOCKET LISTENERS
  useEffect(() => {
    if (!socket || !user) return;

    console.log("🔔 Notification listeners active");

    socket.on("articleLiked", (data) => {
      if (String(data.likedBy) === String(user._id)) return;

      const notif = {
        id: Date.now(),
        type: "like",
        user: resolveUserFromId(data.likedBy),
        action: "liked your post",
        postId: data.postId,
        timestamp: dayjs().fromNow(),
        isNew: true,
      };

      addNotification(notif);
      showPopup(notif);
    });

    socket.on("newComment", (data) => {
      const commenterId = data?.comment?.user;
      if (!commenterId) return;
      if (String(commenterId) === String(user._id)) return;

      const notif = {
        id: Date.now(),
        type: "comment",
        user: resolveUserFromId(commenterId),
        action: "commented on your post",
        postId: data.articleId,
        timestamp: dayjs().fromNow(),
        isNew: true,
      };

      addNotification(notif);
      showPopup(notif);
    });

    socket.on("newPost", (data) => {
      if (String(data.user_id) === String(user._id)) return;

      const notif = {
        id: Date.now(),
        type: "post",
        user: resolveUserFromId(data.user_id),
        action: "posted a new article",
        postId: data.post?._id,
        timestamp: dayjs().fromNow(),
        isNew: true,
      };

      addNotification(notif);
      showPopup(notif);
    });

    return () => {
      socket.off("articleLiked");
      socket.off("newComment");
      socket.off("newPost");
    };
  }, [socket, user, resolveUserFromId, addNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {popup && (
        <div className="fixed top-4 right-4 bg-white shadow-lg border rounded-xl p-4 flex items-center gap-3">
          <img src={popup.user.avatar} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">{popup.user.name}</p>
            <p className="text-sm text-gray-500">{popup.action}</p>
          </div>
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
};