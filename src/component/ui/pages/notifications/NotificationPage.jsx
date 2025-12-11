

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
