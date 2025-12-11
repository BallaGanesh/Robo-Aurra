// import React, { useContext, useEffect } from "react";
// import Layout from "../../Layout";
// import NotificationCard from "../notifications/NotificationCard";
// import { SocketContext } from "../../../../Socket/SocketProvider";
// import { NotificationContext } from "../../../../Notifications/NotificationProvider";
// import { useDispatch } from "react-redux";
// import {
//   acceptFollowRequest,
//   rejectFollowRequest,
// } from "../../../features/followSlice";



// /**
//  * NotificationsPage
//  * - Uses global NotificationContext (notifications, removeNotification)
//  * - Subscribes to socket events (once) and adds notifications via NotificationProvider (already handled there)
//  * - Renders NotificationCard list
//  */

// const NotificationsPage = () => {
//   const dispatch = useDispatch();

//   // GLOBAL notifications from NotificationProvider
//   const { notifications, removeNotification } = useContext(NotificationContext);

//   // Socket (SocketProvider)
//   const { socket } = useContext(SocketContext);



//   // Debug: show notifications when changed
//   useEffect(() => {
//     console.log("🔔 Current notifications:", notifications);
//   }, [notifications]);

//   // OPTIONAL: extra listeners here if you want local reactions (not required since NotificationProvider already listens)
//   useEffect(() => {
//     if (!socket) {
//       console.log("⚠️ NotificationsPage: no socket available");
//       return;
//     }

//     // Helpful debug to see all incoming events — comment out when not needed
//     const anyHandler = (eventName, data) => {
//       console.log("socket ANY ->", eventName, data);
//     };
//     // socket.onAny && socket.onAny(anyHandler); // uncomment to debug all events

//     console.log("🔌 NotificationsPage socket active:", socket.id);

//     return () => {
//       // socket.offAny && socket.offAny(anyHandler);
//       console.log("🔌 NotificationsPage cleaned up listeners");
//     };
//   }, [socket]);

//   // Accept handler — calls Redux thunk and updates local storage (backend returns updated user)
//   const handleAccept = async (notification) => {
//     try {
//       // notification.followerId should exist for follow requests
//       if (!notification?.followerId) {
//         console.warn("handleAccept: missing followerId", notification);
//         return;
//       }

//       const res = await dispatch(acceptFollowRequest(notification.followerId)).unwrap();

//       // Update localStorage user if backend returned updated current user
//       const authData = JSON.parse(localStorage.getItem("user"));
//       if (authData?.user && res?.user) {
//         authData.user = res.user;
//         localStorage.setItem("user", JSON.stringify(authData));
//       }

//       // remove from global notifications
//       removeNotification(notification.id);
//     } catch (err) {
//       console.error("Failed to accept follow request:", err);
//     }
//   };

//   // Reject handler
//   const handleReject = async (notification) => {
//     try {
//       if (!notification?.followerId) {
//         console.warn("handleReject: missing followerId", notification);
//         return;
//       }

//       await dispatch(rejectFollowRequest(notification.followerId)).unwrap();
//       removeNotification(notification.id);
//     } catch (err) {
//       console.error("Failed to reject follow request:", err);
//     }
//   };

//   // Delete (remove) notification
//   const deleteNotification = (id) => {
//     removeNotification(id);
//   };

//   return (
//     <Layout>
//       <div className="max-w-5xl mx-auto px-4 py-6">
//         <div className="sticky top-0 z-10 bg-background pb-4 mb-6">
//           <h1 className="text-3xl font-bold gradient-text mb-4">
//             Notifications
//           </h1>
//         </div>

//         {/* Follow Requests */}
//         <div className="mb-10">
//           <h2 className="text-lg font-bold text-blue-600 mb-3">Follow Requests</h2>

//           {/* Filter follow type notifications */}
//           {notifications.filter((n) => n.type === "follow").length === 0 ? (
//             <p className="text-gray-500 text-sm">No follow requests yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {notifications
//                 .filter((n) => n.type === "follow")
//                 .map((n) => (
//                   <NotificationCard
//                     key={n.id}
//                     notification={n}
//                     onDelete={() => deleteNotification(n.id)}
//                     onAccept={() => handleAccept(n)}
//                     onReject={() => handleReject(n)}
//                     isNew={n.isNew}
//                   />
//                 ))}
//             </div>
//           )}
//         </div>

//         {/* Likes */}
//         <div className="mb-10">
//           <h2 className="text-lg font-bold text-red-500 mb-3">Likes</h2>
//           {notifications.filter((n) => n.type === "like").length === 0 ? (
//             <p className="text-gray-500 text-sm">No likes yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {notifications
//                 .filter((n) => n.type === "like")
//                 .map((n) => (
//                   <NotificationCard
//                     key={n.id}
//                     notification={n}
//                     onDelete={() => deleteNotification(n.id)}
//                   />
//                 ))}
//             </div>
//           )}
//         </div>

//         {/* Comments */}
//         <div className="mb-10">
//           <h2 className="text-lg font-bold text-green-600 mb-3">Comments</h2>
//           {notifications.filter((n) => n.type === "comment").length === 0 ? (
//             <p className="text-gray-500 text-sm">No comments yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {notifications
//                 .filter((n) => n.type === "comment")
//                 .map((n) => (
//                   <NotificationCard
//                     key={n.id}
//                     notification={n}
//                     onDelete={() => deleteNotification(n.id)}
//                   />
//                 ))}
//             </div>
//           )}
//         </div>

//         {/* Other Activity */}
//         <div className="mb-10">
//           <h2 className="text-lg font-bold text-purple-600 mb-3">Other Activity</h2>
//           {notifications.filter((n) => !["follow", "like", "comment"].includes(n.type)).length === 0 ? (
//             <p className="text-gray-500 text-sm">No other activity yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {notifications
//                 .filter((n) => !["follow", "like", "comment"].includes(n.type))
//                 .map((n) => (
//                   <NotificationCard
//                     key={n.id}
//                     notification={n}
//                     onDelete={() => deleteNotification(n.id)}
//                   />
//                 ))}
//             </div>
//           )}
//         </div>

//         {/* General list bottom (optional) */}
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-3">All Notifications (debug)</h2>
//           {notifications.length === 0 ? (
//             <p className="text-gray-500">No notifications</p>
//           ) : (
//             <div className="space-y-2">
//               {notifications.map((n) => (
//                 <div key={n.id} className="p-2 border rounded">
//                   <strong>{n.type}</strong> — {n.action} — <small>{n.timestamp}</small>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default NotificationsPage;

// src/component/ui/pages/notifications/NotificationPage.jsx

import React, { useContext, useEffect } from "react";
import Layout from "../../Layout";
import NotificationCard from "../notifications/NotificationCard";

import { SocketContext } from "../../../../Socket/SocketProvider";
import { NotificationContext } from "../../../../Notifications/NotificationProvider";

import { useDispatch } from "react-redux";
import {
  acceptFollowRequest,
  rejectFollowRequest,
} from "../../../features/followSlice";

const NotificationsPage = () => {
  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext);
  const { notifications, removeNotification } = useContext(NotificationContext);

  // ✅ Use the same user object that profile uses
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const backendPending = storedUser?.pendingRequests || [];

  // ✅ Map backend pendingRequests → NotificationCard format
  const backendMapped = backendPending.map((req) => ({
    id: req._id,
    type: "follow",
    followerId: req._id,
    user: {
      name: req.username || "Unknown User",
      username: req.username || "unknown",
      // 🔥 base64 fix
      avatar: req.profilePhoto
        ? `data:image/jpeg;base64,${req.profilePhoto}`
        : "/default-avatar.png",
    },
    action: "sent you a follow request",
    isNew: false,
    timestamp: "Just now",
  }));

  // ✅ Real-time follow requests from socket
  const socketFollow = notifications
    .filter((n) => n.type === "follow")
    .map((n) => ({
      ...n,
      isNew: true,
    }));

  const mergedFollowRequests = [...backendMapped, ...socketFollow];

  // ✅ Follow ACCEPTED notifications (Feature 1)
  const followAccepted = notifications.filter(
    (n) => n.type === "followAccepted" // make sure your NotificationProvider uses this type
  );

  // Debug
  useEffect(() => {
    console.log("User from localStorage:", storedUser);
    console.log("Backend pending:", backendPending);
    console.log("Socket follow:", socketFollow);
    console.log("Merged requests:", mergedFollowRequests);
  }, [storedUser, backendPending.length, notifications.length]);

  useEffect(() => {
    if (!socket) {
      console.log("⚠️ NotificationsPage: no socket available");
      return;
    }
    console.log("🔌 NotificationsPage socket active:", socket.id);
  }, [socket]);

  const handleAccept = async (notification) => {
    try {
      if (!notification?.followerId) {
        console.warn("handleAccept: missing followerId", notification);
        return;
      }

      const res = await dispatch(
        acceptFollowRequest(notification.followerId)
      ).unwrap();

      // if backend returns updated user, sync into localStorage
      if (res?.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      removeNotification(notification.id);
    } catch (err) {
      console.error("Failed to accept follow request:", err);
    }
  };

  const handleReject = async (notification) => {
    try {
      if (!notification?.followerId) {
        console.warn("handleReject: missing followerId", notification);
        return;
      }

      const res = await dispatch(
        rejectFollowRequest(notification.followerId)
      ).unwrap();

      if (res?.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      removeNotification(notification.id);
    } catch (err) {
      console.error("Failed to reject follow request:", err);
    }
  };

  const deleteNotification = (id) => {
    removeNotification(id);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="sticky top-0 z-10 bg-background pb-4 mb-6">
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Notifications
          </h1>
        </div>

        {/* FOLLOW REQUESTS (pending) */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-blue-600 mb-3">
            Follow Requests
          </h2>

          {mergedFollowRequests.length === 0 ? (
            <p className="text-gray-500 text-sm">No follow requests yet.</p>
          ) : (
            <div className="space-y-3">
              {mergedFollowRequests.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  onDelete={() => deleteNotification(n.id)}
                  onAccept={() => handleAccept(n)}
                  onReject={() => handleReject(n)}
                  isNew={n.isNew}
                />
              ))}
            </div>
          )}
        </div>

        {/* FOLLOW ACTIVITY (accepted requests) */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-purple-600 mb-3">
            Follow Activity
          </h2>
          {followAccepted.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No follow activity yet.
            </p>
          ) : (
            <div className="space-y-3">
              {followAccepted.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  onDelete={() => deleteNotification(n.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* LIKES */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-red-500 mb-3">Likes</h2>
          {notifications.filter((n) => n.type === "like").length === 0 ? (
            <p className="text-gray-500 text-sm">No likes yet.</p>
          ) : (
            <div className="space-y-3">
              {notifications
                .filter((n) => n.type === "like")
                .map((n) => (
                  <NotificationCard
                    key={n.id}
                    notification={n}
                    onDelete={() => deleteNotification(n.id)}
                  />
                ))}
            </div>
          )}
        </div>

        {/* COMMENTS */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-green-600 mb-3">Comments</h2>
          {notifications.filter((n) => n.type === "comment").length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          ) : (
            <div className="space-y-3">
              {notifications
                .filter((n) => n.type === "comment")
                .map((n) => (
                  <NotificationCard
                    key={n.id}
                    notification={n}
                    onDelete={() => deleteNotification(n.id)}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
