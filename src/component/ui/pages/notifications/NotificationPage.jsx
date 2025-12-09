// import { useState, useEffect } from "react";
// import NotificationCard from "../notifications/NotificationCard";

// import Layout from "../../Layout";
// import { socket } from "../../../../Socket/socket";
// import axios from "axios";
// import { acceptFollowRequest,rejectFollowRequest } from "../../../features/followSlice";
// import { useDispatch } from "react-redux";

// const NotificationsPage = () => {

// const dispatch = useDispatch();

// const [notifications, setNotifications] = useState([]);

// const deleteNotification = (id) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

// const handleAccept = async (notification) => {
//   try {
//     const res = await dispatch(
//       acceptFollowRequest(notification.followerId)
//     ).unwrap();

//     // 🔹 Update localStorage user with latest followers/following
//     const authData = JSON.parse(localStorage.getItem("user"));
//     if (authData?.user) {
//       authData.user = res.user; // backend sends updated current user
//       localStorage.setItem("user", JSON.stringify(authData));
//     }

//     // Remove this notification from list
//     deleteNotification(notification.id);
//   } catch (err) {
//     alert(err || "Failed to accept request");
//   }
// };

// const handleReject = async (notification) => {
//   try {
//     await dispatch(rejectFollowRequest(notification.followerId)).unwrap();
//     deleteNotification(notification.id);
//   } catch (err) {
//     alert(err || "Failed to reject request");
//   }
// };

//   useEffect(() => {

//   // FOLLOW REQUEST RECEIVED
//   socket.on("followRequestReceived", (data) => {
//     console.log("🔥 REALTIME FOLLOW REQUEST:", data);

//     setNotifications((prev) => [
//       {
//         id: Date.now().toString(),
//         type: "follow",
//         followerId: data.fromId, // 👈 IMPORTANT
//         user: {
//           name: data.from,
//           username: data.from,
//           avatar: "/default-avatar.png",
//         },
//         action: "sent you a follow request",
//         timestamp: "Just now",
//         isNew: true,
//       },
//       ...prev,
//     ]);
//   });

//   // FOLLOW REQUEST ACCEPTED
//   socket.on("followRequestAccepted", (data) => {
//     setNotifications((prev) => [
//       {
//         id: Date.now(),
//         type: "accept",
//         user: {
//           name: data.by,
//           username: data.by,
//         },
//         action: "accepted your follow request",
//         timestamp: "Just now",
//         isNew: true,
//       },
//       ...prev,
//     ]);
//   });

//   // FOLLOW REQUEST REJECTED
//   socket.on("followRequestRejected", (data) => {
//     setNotifications((prev) => [
//       {
//         id: Date.now(),
//         type: "reject",
//         user: {
//           name: data.by,
//           username: data.by,
//         },
//         action: "rejected your follow request",
//         timestamp: "Just now",
//         isNew: true,
//       },
//       ...prev,
//     ]);
//   });

//   return () => {
//     socket.off("followRequestReceived");
//     socket.off("followRequestAccepted");
//     socket.off("followRequestRejected");
//   };
// }, []);

//   // 🔥 EMPTY LIST — REALTIME SOCKET EVENTS WILL FILL THIS

//   // GROUPED SECTIONS
//   const followRequests = notifications.filter((n) => n.type === "follow");
//   const likes = notifications.filter((n) => n.type === "like");
//   const comments = notifications.filter((n) => n.type === "comment");

//   const otherNotifications = notifications.filter(
//     (n) => !["follow", "like", "comment"].includes(n.type)
//   );

//   // --------------------------------------
//   // REAL-TIME FOLLOW REQUEST EVENT
//   // --------------------------------------
//   useEffect(() => {
//     socket.on("send--followRequestReceived", (data) => {
//       console.log("🔥 REALTIME FOLLOW REQUEST:", data);

//       setNotifications((prev) => [
//         {
//           id: Date.now().toString(),
//           type: "follow",
//           user: {
//             name: data.fromUser,
//             username: data.fromUser,
//             avatar: "/default-avatar.png",
//           },
//           action: "sent you a follow request",
//           timestamp: "Just now",
//           isNew: true,
//         },
//         ...prev,
//       ]);
//     });

//     return () => socket.off("send--followRequestReceived");
//   }, []);

//   return (
//     <Layout>
//       <div className="max-w-5xl mx-auto px-4 py-6">

//         {/* Header */}
//         <div className="sticky top-0 z-10 bg-background pb-4 mb-6">
//           <h1 className="text-3xl font-bold gradient-text mb-4 bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
//             Notifications
//           </h1>
//         </div>

//         {/* ------------------------------------ */}
//         {/* 🔵 FOLLOW REQUESTS SECTION */}
//         {/* ------------------------------------ */}
//         <div className="mb-10">
//           <h2 className="text-lg font-bold text-blue-600 mb-3">Follow Requests</h2>

//           {followRequests.length === 0 ? (
//             <p className="text-gray-500 text-sm">No follow requests yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {followRequests.map((n) => (
//                 <NotificationCard
//                   key={n.id}
//                   notification={n}
//                   onDelete={deleteNotification}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ------------------------------------ */}
//         {/* ❤️ LIKES SECTION */}
//         {/* ------------------------------------ */}
//         <div className="mb-10">
//           <h2 className="text-lg font-bold text-red-500 mb-3">Likes</h2>

//           {likes.length === 0 ? (
//             <p className="text-gray-500 text-sm">No likes yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {likes.map((n) => (
//                 <NotificationCard
//                   key={n.id}
//                   notification={n}
//                   onDelete={deleteNotification}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ------------------------------------ */}
//         {/* 💬 COMMENTS SECTION */}
//         {/* ------------------------------------ */}
//         <div className="mb-10">
//           <h2 className="text-lg font-bold text-green-600 mb-3">Comments</h2>

//           {comments.length === 0 ? (
//             <p className="text-gray-500 text-sm">No comments yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {comments.map((n) => (
//                 <NotificationCard
//                   key={n.id}
//                   notification={n}
//                   onDelete={deleteNotification}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ------------------------------------ */}
//         {/* 🟣 OTHER NOTIFICATIONS (MENTIONS / SHARES ETC.) */}
//         {/* ------------------------------------ */}
//         <div className="mb-10">
//           <h2 className="text-lg font-bold text-purple-600 mb-3">Other Activity</h2>

//           {otherNotifications.length === 0 ? (
//             <p className="text-gray-500 text-sm">No other notifications.</p>
//           ) : (
//             <div className="space-y-3">
//               {otherNotifications.map((n) => (
//                 <NotificationCard
//                   key={n.id}
//                   notification={n}
//                   onDelete={deleteNotification}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* EMPTY STATE */}
//         {notifications.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-16">
//             <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4" />
//             <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
//             <p className="text-muted-foreground text-center max-w-sm">
//               When people follow, like, or comment, you'll see it here instantly.
//             </p>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default NotificationsPage;
// -------------------------------------------------
import { useState, useEffect } from "react";
import NotificationCard from "../notifications/NotificationCard";
import Layout from "../../Layout";
// import { socket } from "../../../../Socket/socket";
import { useContext } from "react";
import {
  acceptFollowRequest,
  rejectFollowRequest,
} from "../../../features/followSlice";
import { useDispatch } from "react-redux";
import { SocketContext } from "../../../../Socket/SocketProvider";

const NotificationsPage = () => {
  const dispatch = useDispatch();

  // MUST BE AT TOP — FIXED
  const [notifications, setNotifications] = useState([]);
  const { socket } = useContext(SocketContext);

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // GROUPED SECTIONS (unchanged)
  const followRequests = notifications.filter((n) => n.type === "follow");
  const likes = notifications.filter((n) => n.type === "like");
  const comments = notifications.filter((n) => n.type === "comment");
  const otherNotifications = notifications.filter(
    (n) => !["follow", "like", "comment"].includes(n.type)
  );

  // -----------------------------
  // ✔ REAL-TIME FOLLOW EVENTS FIXED
  // -----------------------------
  //   useEffect(() => {
  //     // FOLLOW REQUEST RECEIVED
  //     // socket.on("followRequestReceived", (data) => {
  //     //   console.log("🔥 REALTIME FOLLOW REQUEST:", data);

  //     //   setNotifications((prev) => [
  //     //     {
  //     //       id: Date.now().toString(),
  //     //       type: "follow",
  //     //       followerId: data.fromId,
  //     //       user: {
  //     //         name: data.from,
  //     //         username: data.from,
  //     //         avatar: "/default-avatar.png",
  //     //       },
  //     //       action: "sent you a follow request",
  //     //       timestamp: "Just now",
  //     //       isNew: true,
  //     //     },
  //     //     ...prev,
  //     //   ]);
  //     // });
  //     socket.on("send -- followRequestReceived", (data) => {
  //   console.log("🔥 REALTIME FOLLOW REQUEST ARRIVED:", data);

  //   setNotifications((prev) => [
  //     {
  //       id: Date.now().toString(),
  //       type: "follow",
  //       followerId: data.fromId,
  //       user: {
  //         name: data.from,
  //         username: data.from,
  //         avatar: "/default-avatar.png",
  //       },
  //       action: "sent you a follow request",
  //       timestamp: "Just now",
  //       isNew: true,
  //     },
  //     ...prev,
  //   ]);
  // });

  //     // FOLLOW REQUEST ACCEPTED
  //     socket.on("followRequestAccepted", (data) => {
  //       setNotifications((prev) => [
  //         {
  //           id: Date.now().toString(),
  //           type: "accept",
  //           user: {
  //             name: data.by,
  //             username: data.by,
  //             avatar: "/default-avatar.png",
  //           },
  //           action: "accepted your follow request",
  //           timestamp: "Just now",
  //           isNew: true,
  //         },
  //         ...prev,
  //       ]);
  //     });

  //     // FOLLOW REQUEST REJECTED
  //     socket.on("followRequestRejected", (data) => {
  //       setNotifications((prev) => [
  //         {
  //           id: Date.now().toString(),
  //           type: "reject",
  //           user: {
  //             name: data.by,
  //             username: data.by,
  //             avatar: "/default-avatar.png",
  //           },
  //           action: "rejected your follow request",
  //           timestamp: "Just now",
  //           isNew: true,
  //         },
  //         ...prev,
  //       ]);
  //     });

  //     return () => {
  //       socket.off("followRequestReceived");
  //       socket.off("followRequestAccepted");
  //       socket.off("followRequestRejected");
  //     };
  //   }, []);
  // -----------------------------
  // REAL-TIME FOLLOW EVENTS ALTERNATIVE FIX
  // -----------------------------
  // useEffect(() => {

  //   socket.onAny((event, data) => {
  //   console.log("📩 RECEIVED EVENT:", event, data);
  // });
  //   const handleFollowReceived = (data) => {
  //     console.log("🔥 FOLLOW REQUEST RECEIVED:", data);

  //     setNotifications((prev) => [
  //       {
  //         id: Date.now().toString(),
  //         type: "follow",
  //         followerId: data.fromId,
  //         user: {
  //           name: data.from,
  //           username: data.from,
  //           avatar: "/default-avatar.png",
  //         },
  //         action: "sent you a follow request",
  //         timestamp: "Just now",
  //         isNew: true,
  //       },
  //       ...prev,
  //     ]);
  //   };

  //   const handleFollowAccepted = (data) => {
  //     setNotifications((prev) => [
  //       {
  //         id: Date.now().toString(),
  //         type: "accept",
  //         user: {
  //           name: data.by,
  //           username: data.by,
  //           avatar: "/default-avatar.png",
  //         },
  //         action: "accepted your request",
  //         timestamp: "Just now",
  //         isNew: true,
  //       },
  //       ...prev,
  //     ]);
  //   };

  //   const handleFollowRejected = (data) => {
  //     setNotifications((prev) => [
  //       {
  //         id: Date.now().toString(),
  //         type: "reject",
  //         user: {
  //           name: data.by,
  //           username: data.by,
  //           avatar: "/default-avatar.png",
  //         },
  //         action: "rejected your request",
  //         timestamp: "Just now",
  //         isNew: true,
  //       },
  //       ...prev,
  //     ]);
  //   };

  //   // ⭐ LISTEN TO EXACT BACKEND EVENTS
  //   socket.on("followRequestReceived", handleFollowReceived);
  //   socket.on("followRequestAccepted", handleFollowAccepted);
  //   socket.on("followRequestRejected", handleFollowRejected);

  //   return () => {
  //     socket.off("followRequestReceived", handleFollowReceived);
  //     socket.off("followRequestAccepted", handleFollowAccepted);
  //     socket.off("followRequestRejected", handleFollowRejected);
  //   };
  // }, []);
  // -----------------------------
  // ALTERNATIVE REAL-TIME FOLLOW REQUEST EVENT FIX
  // -----------------------------
 useEffect(() => {
  
  if (!socket) {
    console.log("⚠️ No socket available!");
    return;
  }

  console.log("🔌 Notifications socket connected:", socket.id);


  if (!socket) return;

  // socket.on("followRequestReceived", (data) => {
  //   console.log("🔥 FOLLOW REQUEST RECEIVED:", data);
  // });
  socket.on("followRequestReceived", (data) => {
  console.log("🔥 FOLLOW REQUEST RECEIVED:", data);

  setNotifications((prev) => [
    {
      id: Date.now().toString(),
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
    },
    ...prev,
  ]);
});


  // socket.on("followRequestAccepted", (data) => {
  //   console.log("🔥 FOLLOW ACCEPTED:", data);
  // });
  socket.on("followRequestAccepted", (data) => {
  setNotifications((prev) => [
    {
      id: Date.now().toString(),
      type: "accept",
      user: {
        name: data.by,
        username: data.by,
        avatar: "/default-avatar.png",
      },
      action: "accepted your follow request",
      timestamp: "Just now",
      isNew: true,
    },
    ...prev,
  ]);
});


  // socket.on("followRequestRejected", (data) => {
  //   console.log("🔥 FOLLOW REJECTED:", data);
  // });
  socket.on("followRequestRejected", (data) => {
  setNotifications((prev) => [
    {
      id: Date.now().toString(),
      type: "reject",
      user: {
        name: data.by,
        username: data.by,
        avatar: "/default-avatar.png",
      },
      action: "rejected your follow request",
      timestamp: "Just now",
      isNew: true,
    },
    ...prev,
  ]);
});


  return () => {
    socket.off("followRequestReceived");
    socket.off("followRequestAccepted");
    socket.off("followRequestRejected");
  };
});


  // -----------------------------
  // ACCEPT/REJECT HANDLERS
  // -----------------------------
  const handleAccept = async (notification) => {
    try {
      const res = await dispatch(
        acceptFollowRequest(notification.followerId)
      ).unwrap();

      // Update local storage (required)
      const authData = JSON.parse(localStorage.getItem("user"));
      if (authData?.user) {
        authData.user = res.user;
        localStorage.setItem("user", JSON.stringify(authData));
      }

      deleteNotification(notification.id);
    } catch (err) {
      // alert(err || "Failed to accept request");
      console.log(err);
      
    }
  };

  const handleReject = async (notification) => {
    try {
      await dispatch(rejectFollowRequest(notification.followerId)).unwrap();
      deleteNotification(notification.id);
    } catch (err) {
      // alert(err || "Failed to reject request");
      console.log(err);
      
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background pb-4 mb-6">
          <h1 className="text-3xl font-bold gradient-text mb-4 bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Notifications
          </h1>
        </div>

        {/* FOLLOW REQUESTS */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-blue-600 mb-3">
            Follow Requests
          </h2>

          {followRequests.length === 0 ? (
            <p className="text-gray-500 text-sm">No follow requests yet.</p>
          ) : (
            <div className="space-y-3">
              {followRequests.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  onDelete={deleteNotification}
                  onAccept={() => handleAccept(n)} // ⭐ REQUIRED
                  onReject={() => handleReject(n)} // ⭐ REQUIRED
                  isNew={n.isNew} // ⭐ REQUIRED
                />
              ))}
            </div>
          )}
        </div>

        {/* LIKES */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-red-500 mb-3">Likes</h2>

          {likes.length === 0 ? (
            <p className="text-gray-500 text-sm">No likes yet.</p>
          ) : (
            <div className="space-y-3">
              {likes.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
        </div>

        {/* COMMENTS */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-green-600 mb-3">Comments</h2>

          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          ) : (
            <div className="space-y-3">
              {comments.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
        </div>

        {/* OTHER ACTIVITY */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-purple-600 mb-3">
            Other Activity
          </h2>

          {otherNotifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No other notifications.</p>
          ) : (
            <div className="space-y-3">
              {otherNotifications.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
        </div>

        {/* EMPTY */}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              When people follow, like, or comment, you'll see it here
              instantly.
            </p>
          </div>
        )}
        <div className="space-y-3 mt-10">
  {notifications.map((n) => (
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

      </div>
    </Layout>
  );
};

export default NotificationsPage;