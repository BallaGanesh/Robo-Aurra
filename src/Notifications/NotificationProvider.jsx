// import { createContext, useState, useEffect, useContext } from "react";
// import { SocketContext } from "../Socket/SocketProvider";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

// export const NotificationContext = createContext();

// dayjs.extend(relativeTime);

// export const NotificationProvider = ({ children }) => {
//   const { socket } = useContext(SocketContext);

//   // 🔑 get current user
//   const getUser = () => JSON.parse(localStorage.getItem("user"));
//   const getStorageKey = () => {
//     const user = getUser();
//     return user?._id ? `notifications_${user._id}` : null;
//   };

//   // 🔔 Load notifications PER USER
//   const [notifications, setNotifications] = useState(() => {
//     const key = getStorageKey();
//     if (!key) return [];
//     const saved = localStorage.getItem(key);
//     return saved ? JSON.parse(saved) : [];
//   });

//   // 🔄 Reload notifications when user changes (login / logout)
//   useEffect(() => {
//     const key = getStorageKey();
//     if (!key) {
//       setNotifications([]);
//       return;
//     }
//     const saved = localStorage.getItem(key);
//     setNotifications(saved ? JSON.parse(saved) : []);
//   }, []);

//   // 💾 Persist notifications PER USER
//   useEffect(() => {
//     const key = getStorageKey();
//     if (!key) return;
//     localStorage.setItem(key, JSON.stringify(notifications));
//   }, [notifications]);

//   // 🔍 Resolve username from id
//   const resolveUserFromId = (userId) => {
//     const loggedUser = getUser();
//     if (!userId || !loggedUser) {
//       return {
//         name: "Unknown User",
//         username: "unknown",
//         avatar: "/default-avatar.png",
//       };
//     }

//     if (String(loggedUser._id) === String(userId)) {
//       return {
//         name: loggedUser.username,
//         username: loggedUser.username,
//         avatar: loggedUser.profilePhoto
//           ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
//           : "/default-avatar.png",
//       };
//     }

//     const follower = loggedUser.followers?.find(
//       (u) => String(u._id) === String(userId)
//     );
//     if (follower) {
//       return {
//         name: follower.username,
//         username: follower.username,
//         avatar: follower.profilePhoto
//           ? `data:image/jpeg;base64,${follower.profilePhoto}`
//           : "/default-avatar.png",
//       };
//     }

//     const following = loggedUser.following?.find(
//       (u) => String(u._id) === String(userId)
//     );
//     if (following) {
//       return {
//         name: following.username,
//         username: following.username,
//         avatar: following.profilePhoto
//           ? `data:image/jpeg;base64,${following.profilePhoto}`
//           : "/default-avatar.png",
//       };
//     }

//     return {
//       name: "Unknown User",
//       username: "unknown",
//       avatar: "/default-avatar.png",
//     };
//   };

//   const addNotification = (notif) => {
//     setNotifications((prev) => [notif, ...prev]);
//   };

//   const removeNotification = (id) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   // 🔔 popup
//   const [popup, setPopup] = useState(null);
//   const showPopup = (notif) => {
//     setPopup(notif);
//     setTimeout(() => setPopup(null), 6000);
//   };

//   // 🔌 SOCKET LISTENERS
//   useEffect(() => {
//     if (!socket) return;

//     console.log("🔔 Notification listeners active");

//     // FOLLOW REQUEST RECEIVED
//     socket.on("followRequestReceived", (data) => {
//       console.log(data);
      
//       const notif = {
//         id: Date.now(),
//         type: "follow",
//         followerId: data.fromId,
//         user: {
//           name: data.from,
//           username: data.from,
//           avatar: "/default-avatar.png",
//         },
//         action: "sent you a follow request",
//         timestamp: dayjs().fromNow(),
//         isNew: true,
//       };
//       addNotification(notif);
//       showPopup(notif);
//     });

//   //  FOLLOW REQUEST ACCEPTED
//     socket.on("followRequestAccepted", (data) => {
//       const notif = {
//         id: Date.now(),
//         type: "followAccepted",
//         followerId: data.byId,
//         user: {
//           name: data.by,
//           username: data.by,
//           avatar: "/default-avatar.png",
//         },
//         action: "accepted your follow request",
//         timestamp: dayjs().fromNow(),
//         isNew: true,
//       };
//       addNotification(notif);
//       showPopup(notif);
//     });

//     // FOLLOW REQUEST REJECTED
//     socket.on("followRequestRejected", (data) => {
//       const notif = {
//         id: Date.now(),
//         type: "followRejected",
//         followerId: data.byId,
//         user: {
//           name: data.by,
//           username: data.by,
//           avatar: "/default-avatar.png",
//         },
//         action: "rejected your follow request",
//         timestamp: dayjs().fromNow(),
//         isNew: true,
//       };
//       addNotification(notif);
//       showPopup(notif);
//     });

//     // ARTICLE LIKED
//     socket.on("articleLiked", (data) => {
//   console.log("❤️ LIKE SOCKET DATA:", data);

//   const loggedUser = JSON.parse(localStorage.getItem("user"));
//   const likerId = data?.likedBy; // backend sends user_id

//   if (!likerId) return;

//   // 🔕 Ignore own likes
//   if (String(likerId) === String(loggedUser?._id)) return;

//   const author = resolveUserFromId(likerId);

//   const notif = {
//     id: Date.now(),
//     type: "like",
//     user: author,
//     action: "liked your post",
//     postId: data.postId,
//     timestamp: dayjs().fromNow(),
//     isNew: true,
//   };

//   addNotification(notif);
//   showPopup(notif);
// });

// // NEW COMMENT
//     socket.on("newComment", (data) => {
//       const loggedUser = getUser();
//       const commenterId = data?.comment?.user;
//       if (!commenterId) return;
//       if (String(commenterId) === String(loggedUser?._id)) return;

//       const author = resolveUserFromId(commenterId);

//       const notif = {
//         id: Date.now(),
//         type: "comment",
//         user: author,
//         action: "commented on your post",
//         postId: data.articleId,
//         timestamp: dayjs().fromNow(),
//         isNew: true,
//       };

//       addNotification(notif);
//       showPopup(notif);
//     });

//     // NEW POST
//     socket.on("newPost", (data) => {
//       const loggedUser = getUser();
//       if (String(data.user_id) === String(loggedUser?._id)) return;

//       const author = resolveUserFromId(data.user_id);

//       const notif = {
//         id: Date.now(),
//         type: "post",
//         user: author,
//         action: "posted a new article",
//         postId: data.post?._id,
//         title: data.post?.title || "",
//         timestamp: dayjs().fromNow(),
//         isNew: true,
//       };

//       addNotification(notif);
//       showPopup(notif);
//     });

//     return () => {
//       socket.off("followRequestReceived");
//       socket.off("followRequestAccepted");
//       socket.off("followRequestRejected");
//       socket.off("articleLiked");
//       socket.off("newComment");
//       socket.off("newPost");
//     };
//   }, [socket]);

//   return (
//     <NotificationContext.Provider
//       value={{ notifications, addNotification, removeNotification }}
//     >
//       {popup && (
//         <div className="fixed top-4 right-4 z-[9999] bg-white shadow-lg border rounded-xl p-4 flex items-center gap-3">
//           <img src={popup.user.avatar} className="w-10 h-10 rounded-full" />
//           <div>
//             <p className="font-semibold">{popup.user.name}</p>
//             <p className="text-sm text-gray-500">{popup.action}</p>
//           </div>
//         </div>
//       )}
//       {children}
//     </NotificationContext.Provider>
//   );
// };


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