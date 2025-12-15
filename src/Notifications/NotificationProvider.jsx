// import { createContext, useState, useEffect, useContext } from "react";
// import { SocketContext } from "../Socket/SocketProvider";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

// export const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const { socket } = useContext(SocketContext);

//   dayjs.extend(relativeTime);

//   // Load notifications
//   const [notifications, setNotifications] = useState(() => {
//     const saved = localStorage.getItem("global_notifications");
//     return saved ? JSON.parse(saved) : [];
//   });
//   console.log("🟢 Binding notification listeners");

//   const resolveUserFromId = (userId) => {
//     const loggedUser = JSON.parse(localStorage.getItem("user"));
//     if (!userId || !loggedUser) {
//       return {
//         name: "Unknown User",
//         username: "unknown",
//         avatar: "/default-avatar.png",
//       };
//     }

//     // 1️⃣ Logged-in user
//     if (String(loggedUser._id) === String(userId)) {
//       return {
//         name: loggedUser.username,
//         username: loggedUser.username,
//         avatar: loggedUser.profilePhoto
//           ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
//           : "/default-avatar.png",
//       };
//     }

//     // 2️⃣ Followers
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

//     // 3️⃣ Following
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

//   // 🔧 FIX OLD NOTIFICATIONS (add missing followerId)
//   useEffect(() => {
//     setNotifications((prev) =>
//       prev.map((n) => ({
//         ...n,
//         followerId: n.followerId || n.fromId || n.byId || null,
//       }))
//     );
//   }, []);

//   // Save notifications persistently
//   useEffect(() => {
//     localStorage.setItem("global_notifications", JSON.stringify(notifications));
//   }, [notifications]);

//   // Add notification to list
//   const addNotification = (notif) => {
//     setNotifications((prev) => [notif, ...prev]);
//   };

//   const removeNotification = (id) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   // Popup preview state
//   const [popup, setPopup] = useState(null);

//   const showPopup = (notif) => {
//     setPopup(notif);
//     setTimeout(() => setPopup(null), 6000);
//   };

//   // Socket listeners
//   useEffect(() => {
//     if (!socket) return;

//     console.log("🔔 Global Notification Listener Active");

//     // 1️⃣ FOLLOW REQUEST RECEIVED
//     socket.on("followRequestReceived", (data) => {
//       console.log("✅ follow request RECEIVED", data);

//       const notif = {
//         id: Date.now(),
//         type: "follow",
//         followerId: data.fromId, // required for accept/reject
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

//     // 2️⃣ FOLLOW REQUEST ACCEPTED
//     socket.on("followRequestAccepted", (data) => {
//       console.log("✅ ACCEPT EVENT RECEIVED", data);
//       const notif = {
//         id: Date.now(),
//         type: "followAccepted", // 🔥 IMPORTANT

//         followerId: data.byId, // backend uses byId for accepted
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

//     // 3️⃣ FOLLOW REQUEST REJECTED
//     socket.on("followRequestRejected", (data) => {
//       console.log("✅ follow request rejected", data);

//       const notif = {
//         id: Date.now(),
//         type: "followRejected",
//         followerId: data.byId, // backend uses byId
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

//     // ADDED LIKE NOTIFICATION
//     socket.on("articleLiked", (data) => {
//       const notif = {
//         id: Date.now(),
//         type: "like",
//         user: {
//           name: data.likedBy,
//           username: data.likedBy,
//           avatar: data.profilePhoto
//             ? `data:image/jpeg;base64,${data.profilePhoto}`
//             : "/default-avatar.png",
//         },
//         action: "liked your post",
//         postId: data.postId,
//         timestamp: dayjs().fromNow(),
//         isNew: true,
//       };
//       addNotification(notif);
//       showPopup(notif);
//     });

//     // ADDED COMMENT NOTIFIFICATION
//     // socket.on("newComment", (data) => {
//     //   const notif = {
//     //     id: Date.now(),
//     //     type: "comment",
//     //     user: {
//     //       name: data.commentedBy,
//     //       username: data.commentedBy,
//     //       avatar: data.profilePhoto
//     //         ? `data:image/jpeg;base64,${data.profilePhoto}`
//     //         : "/default-avatar.png",
//     //     },
//     //     action: "commented on your post",
//     //     postId: data.postId,
//     //     comment: data.comment?.text || "",
//     //     timestamp: "Just now",
//     //     isNew: true,
//     //   };

//     //   addNotification(notif);
//     //   showPopup(notif);
//     // });

//    socket.on("newComment", (data) => {
//     console.log("COMMENT SOCKET DATA:", data);
    



//   const loggedUser = JSON.parse(localStorage.getItem("user"));

//   const commenterId = data?.comment?.user;
// console.log("🧩 Commenter ID:", commenterId);
//   if (!commenterId) return;

//   // 🔕 Ignore own comments
//   if (String(commenterId) === String(loggedUser?._id)) return;

//   const author = resolveUserFromId(commenterId);
// console.log("🧩 Resolved author:", author);
//   const notif = {
//     id: Date.now(),
//     type: "comment",
//     user: author,
//     action: "commented on your post",
//     postId: data.articleId,
//     timestamp: dayjs().fromNow(),
//     isNew: true,
//   };

//   addNotification(notif);
//   showPopup(notif);
// });


//     // ADD NEW POST
//     socket.on("newPost", (data) => {
//       const loggedUser = JSON.parse(localStorage.getItem("user"));

//       // Ignore own post
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
//       value={{
//         notifications,
//         addNotification,
//         removeNotification,
//       }}
//     >
//       {/* 🔥 Popup UI */}
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


import { createContext, useState, useEffect, useContext } from "react";
import { SocketContext } from "../Socket/SocketProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const NotificationContext = createContext();

dayjs.extend(relativeTime);

export const NotificationProvider = ({ children }) => {
  const { socket } = useContext(SocketContext);

  // 🔑 get current user
  const getUser = () => JSON.parse(localStorage.getItem("user"));
  const getStorageKey = () => {
    const user = getUser();
    return user?._id ? `notifications_${user._id}` : null;
  };

  // 🔔 Load notifications PER USER
  const [notifications, setNotifications] = useState(() => {
    const key = getStorageKey();
    if (!key) return [];
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  // 🔄 Reload notifications when user changes (login / logout)
  useEffect(() => {
    const key = getStorageKey();
    if (!key) {
      setNotifications([]);
      return;
    }
    const saved = localStorage.getItem(key);
    setNotifications(saved ? JSON.parse(saved) : []);
  }, []);

  // 💾 Persist notifications PER USER
  useEffect(() => {
    const key = getStorageKey();
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(notifications));
  }, [notifications]);

  // 🔍 Resolve username from id
  const resolveUserFromId = (userId) => {
    const loggedUser = getUser();
    if (!userId || !loggedUser) {
      return {
        name: "Unknown User",
        username: "unknown",
        avatar: "/default-avatar.png",
      };
    }

    if (String(loggedUser._id) === String(userId)) {
      return {
        name: loggedUser.username,
        username: loggedUser.username,
        avatar: loggedUser.profilePhoto
          ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
          : "/default-avatar.png",
      };
    }

    const follower = loggedUser.followers?.find(
      (u) => String(u._id) === String(userId)
    );
    if (follower) {
      return {
        name: follower.username,
        username: follower.username,
        avatar: follower.profilePhoto
          ? `data:image/jpeg;base64,${follower.profilePhoto}`
          : "/default-avatar.png",
      };
    }

    const following = loggedUser.following?.find(
      (u) => String(u._id) === String(userId)
    );
    if (following) {
      return {
        name: following.username,
        username: following.username,
        avatar: following.profilePhoto
          ? `data:image/jpeg;base64,${following.profilePhoto}`
          : "/default-avatar.png",
      };
    }

    return {
      name: "Unknown User",
      username: "unknown",
      avatar: "/default-avatar.png",
    };
  };

  const addNotification = (notif) => {
    setNotifications((prev) => [notif, ...prev]);
  };

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
    if (!socket) return;

    console.log("🔔 Notification listeners active");

    socket.on("followRequestReceived", (data) => {
      const notif = {
        id: Date.now(),
        type: "follow",
        followerId: data.fromId,
        user: {
          name: data.from,
          username: data.from,
          avatar: "/default-avatar.png",
        },
        action: "sent you a follow request",
        timestamp: dayjs().fromNow(),
        isNew: true,
      };
      addNotification(notif);
      showPopup(notif);
    });

    socket.on("followRequestAccepted", (data) => {
      const notif = {
        id: Date.now(),
        type: "followAccepted",
        followerId: data.byId,
        user: {
          name: data.by,
          username: data.by,
          avatar: "/default-avatar.png",
        },
        action: "accepted your follow request",
        timestamp: dayjs().fromNow(),
        isNew: true,
      };
      addNotification(notif);
      showPopup(notif);
    });

    socket.on("followRequestRejected", (data) => {
      const notif = {
        id: Date.now(),
        type: "followRejected",
        followerId: data.byId,
        user: {
          name: data.by,
          username: data.by,
          avatar: "/default-avatar.png",
        },
        action: "rejected your follow request",
        timestamp: dayjs().fromNow(),
        isNew: true,
      };
      addNotification(notif);
      showPopup(notif);
    });

    // socket.on("articleLiked", (data) => {
    //   const notif = {
    //     id: Date.now(),
    //     type: "like",
    //     user: {
    //       name: data.likedBy,
    //       username: data.likedBy,
    //       avatar: data.profilePhoto
    //         ? `data:image/jpeg;base64,${data.profilePhoto}`
    //         : "/default-avatar.png",
    //     },
    //     action: "liked your post",
    //     postId: data.postId,
    //     timestamp: dayjs().fromNow(),
    //     isNew: true,
    //   };
    //   addNotification(notif);
    //   showPopup(notif);
    // });

    socket.on("articleLiked", (data) => {
  console.log("❤️ LIKE SOCKET DATA:", data);

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const likerId = data?.likedBy; // backend sends user_id

  if (!likerId) return;

  // 🔕 Ignore own likes
  if (String(likerId) === String(loggedUser?._id)) return;

  const author = resolveUserFromId(likerId);

  const notif = {
    id: Date.now(),
    type: "like",
    user: author,
    action: "liked your post",
    postId: data.postId,
    timestamp: dayjs().fromNow(),
    isNew: true,
  };

  addNotification(notif);
  showPopup(notif);
});


    socket.on("newComment", (data) => {
      const loggedUser = getUser();
      const commenterId = data?.comment?.user;
      if (!commenterId) return;
      if (String(commenterId) === String(loggedUser?._id)) return;

      const author = resolveUserFromId(commenterId);

      const notif = {
        id: Date.now(),
        type: "comment",
        user: author,
        action: "commented on your post",
        postId: data.articleId,
        timestamp: dayjs().fromNow(),
        isNew: true,
      };

      addNotification(notif);
      showPopup(notif);
    });

    socket.on("newPost", (data) => {
      const loggedUser = getUser();
      if (String(data.user_id) === String(loggedUser?._id)) return;

      const author = resolveUserFromId(data.user_id);

      const notif = {
        id: Date.now(),
        type: "post",
        user: author,
        action: "posted a new article",
        postId: data.post?._id,
        title: data.post?.title || "",
        timestamp: dayjs().fromNow(),
        isNew: true,
      };

      addNotification(notif);
      showPopup(notif);
    });

    return () => {
      socket.off("followRequestReceived");
      socket.off("followRequestAccepted");
      socket.off("followRequestRejected");
      socket.off("articleLiked");
      socket.off("newComment");
      socket.off("newPost");
    };
  }, [socket]);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {popup && (
        <div className="fixed top-4 right-4 z-[9999] bg-white shadow-lg border rounded-xl p-4 flex items-center gap-3">
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
