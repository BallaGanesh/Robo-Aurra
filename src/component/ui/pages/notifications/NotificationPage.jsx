import React, { useContext, useEffect } from "react";
import Layout from "../../Layout";
import NotificationCard from "../notifications/NotificationCard";

import { SocketContext } from "../../../../Socket/SocketProvider";
import { NotificationContext } from "../../../../Notifications/NotificationProvider";

import { useDispatch, useSelector } from "react-redux";
import {
  acceptFollowRequest,
  rejectFollowRequest,
} from "../../../features/followSlice";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.Auth); 
  console.log(user);
   
// value of child
  const {valueFromChild}=useSelector((state)=>state.child);
  const { socket } = useContext(SocketContext);
  const { notifications, removeNotification ,markAllAsRead } = useContext(NotificationContext);

  // ✅ Use the same user object that profile uses
  const storedUser = user;
  const backendPending = storedUser?.pendingRequests || [];

  // Mark all as read on page load
useEffect(() => {
  if (notifications.some((n) => n.isNew)) {
    markAllAsRead();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  //  Map backend pendingRequests → NotificationCard format
  const backendMapped = backendPending.map((req) => ({
    id: req._id,
    type: "follow",
    followerId: req._id,
    user: {
      name: req.username || "Unknown User",
      username: req.username || "unknown",
      //  base64 fix
      avatar: req.profilePhoto
        ? `data:image/jpeg;base64,${req.profilePhoto}`
        : "/default-avatar.png",
    },
    action: "sent you a follow request",
    isNew: false,
    timestamp: "Just now",
  }));

  //  Real-time follow requests from socket
  const socketFollow = notifications
    .filter((n) => n.type === "follow")
    .map((n) => ({ ...n, isNew: true, }));

  const mergedFollowRequests = [...backendMapped, ...socketFollow];

  //  Follow ACCEPTED notifications (Feature 1)
  const followAccepted = notifications.filter(
    (n) => n.type === "followAccepted"
  );

  const followRejected = notifications.filter(
    (n) => n.type === "followRejected"
  );

  // Debug
  useEffect(() => {
    console.log("User from global state:", user);
    console.log("Backend pending:", backendPending);
    console.log("Socket follow:", socketFollow);
    console.log("Merged requests:", mergedFollowRequests);
  }, [user, backendPending.length, notifications.length]);

  useEffect(() => {
    if (!socket) {
      console.log("⚠️ NotificationsPage: no socket available");
      return;
    }
    console.log("🔌 NotificationsPage socket active:", socket.id);
  }, [socket]);


  // HANDLE ACCEPT
  const handleAccept = async (notification) => {
    try {
      if (!notification?.followerId) {
        console.warn("handleAccept: missing followerId", notification);
        return;
      }

       await dispatch(
        acceptFollowRequest(notification.followerId)
      ).unwrap();

      removeNotification(notification.id);
    } catch (err) {
      console.error("Failed to accept follow request:", err);
    }
  };

  // HANDLE REJECT
const handleReject = async (notification) => {
  try {
    const id = notification.followerId || notification.fromId;

    if (!id) {
      console.warn("handleReject: missing followerId", notification);
      return;
    }

    // const res = await dispatch(
    //   rejectFollowRequest(id)
    // ).unwrap();

    // if (res?.user) {
    //   localStorage.setItem("user", JSON.stringify(res.user));
    // }

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
        <div className="sticky top-0 z-10 bg-background pb-2 mb-6 " style={`${valueFromChild}`==='light'?{backgroundColor:'black'}:{backgroundColor:'#f5f5f5'}}>
          <h1 className="text-3xl w-44 font-bold gradient-text mb-4 bg-linear-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text">Notifications</h1>
        </div>

        {/* FOLLOW REQUESTS (pending) */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-blue-600 mb-3">Follow Requests</h2>

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
                  isNew={n.isNew}/>
              ))}
            </div>
          )}
        </div>

        {/* FOLLOW ACTIVITY (accepted requests) */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-purple-600 mb-3">Follow Activity</h2>
          {followAccepted.length === 0 ? (
            <p className="text-gray-500 text-sm">No follow activity yet.</p>
          ) : (
            <div className="space-y-3">
              {followAccepted.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  onDelete={() => deleteNotification(n.id)}/>
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
                    onDelete={() => deleteNotification(n.id)}/>
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
                    onDelete={() => deleteNotification(n.id)}/>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;