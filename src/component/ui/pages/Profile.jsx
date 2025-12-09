import { useState } from "react";
import PostCard from "../PostCard";
import Layout from "../Layout";

import { IoCloseSharp } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import FollowModal from "./FollowModal";
import {
  sendFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
} from "../../features/followSlice";
// import { socket } from "../../../Socket/socket";
import { useContext } from "react";
import { SocketProvider } from "./../../../Socket/SocketProvider";
import { SocketContext } from "./../../../Socket/SocketProvider";




import { IoIosList } from "react-icons/io";
import { BsGrid } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";

import { useSelector } from "react-redux";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState("grid");
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  // ⭐ NEW STATE FOR FOLLOW REQUEST MODAL
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followUsername, setFollowUsername] = useState("");
  const { socket } = useContext(SocketContext);

  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    bio: "Passionate about design, code, and coffee ☕ | Building beautiful digital experiences",
  });

  const dispatch = useDispatch();

  // ⭐ NEW FUNCTION TO HANDLE SEND REQUEST
  // const handleSendRequest = async () => {
  //   if (!followUsername.trim()) {
  //     alert("Please enter a username");
  //     return;
  //   }

  //   try {
  //     await dispatch(sendFollowRequest(followUsername)).unwrap();
  //     alert("Follow request sent!");

  //     setFollowUsername("");        
  //     setShowFollowModal(false);    
  //   } catch (err) {
  //     alert(err || "Failed to send follow request.");
  //   }
  // };

  // ----------
  // working version
  // -----------
//  const handleSendRequest = async () => {
//   if (!followUsername.trim()) {
//     alert("Please enter a username");
//     return;
//   }

//   try {
//     // 1️⃣ Send API request
//     await dispatch(sendFollowRequest(followUsername)).unwrap();

//     // 2️⃣ Emit realtime notification
//     socket.emit("send--followRequestReceived", {
//       fromUser: loggedUser?.username,   // who is sending
//       toUser: followUsername            // who will receive
//     });

//     alert("Follow request sent!");

//     setFollowUsername("");
//     setShowFollowModal(false);

//   } catch (err) {
//     alert(err || "Failed to send follow request.");
//   }
// };

// const handleSendRequest = async () => {
//   if (!followUsername.trim()) {
//     alert("Please enter a username");
//     return;
//   }

//   try {
//     await dispatch(sendFollowRequest(followUsername)).unwrap();

//     alert("Follow request sent!");

//     setFollowUsername("");
//     setShowFollowModal(false);
//   } catch (err) {
//     alert(err || "Failed to send follow request.");
//   }
// };

const handleSendRequest = async () => {
  if (!followUsername.trim()) {
    alert("Please enter a username");
    return;
  }

  try {
    // Step 1: API call
    await dispatch(sendFollowRequest(followUsername)).unwrap();

    const socket = getSocket();

    // Step 2: Emit event to backend for real-time logic
    if (socket && socket.connected) {
      socket.emit("sendFollowRequest", {
        from: loggedUser.username,
        fromId: loggedUser._id,
        toUsername: followUsername
      });

      console.log("📤 Socket event sent: sendFollowRequest");
    }

    alert("Follow request sent!");
    setFollowUsername("");
    setShowFollowModal(false);

  } catch (err) {
    // alert(err || "Failed to send follow request.");
    console.log(err);
    
  }
};



  const followers = [
    {
      id: "1",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      isFollowing: true,
    },
    {
      id: "2",
      name: "Alex Chen",
      username: "alexchen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      isFollowing: false,
    },
    {
      id: "3",
      name: "Emma Davis",
      username: "emmadavis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      isFollowing: true,
    },
    {
      id: "4",
      name: "Michael Park",
      username: "mpark",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      isFollowing: false,
    },
  ];

  const { posts } = useSelector((state) => state.articles);

  const auth = useSelector((state) => state.Auth);
  const user = auth?.user ?? null;

  const authData = JSON.parse(localStorage.getItem("user"));
  const loggedUser = authData;

  const filteredFollowers = followers.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const FollowerModal = ({ isFollowing }) => {
    const list = isFollowing ? followers : followers;
    const title = isFollowing ? "Following" : "Followers";

    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
        onClick={() => {
          setShowFollowerModal(false);
          setShowFollowingModal(false);
        }}
      >
        <div
          className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-hidden animate-scale-in flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b">
            <h2 className="text-lg md:text-xl font-bold">{title}</h2>
            <button
              onClick={() => {
                setShowFollowerModal(false);
                setShowFollowingModal(false);
              }}
              className="text-muted-foreground"
            >
              <IoCloseSharp size={24} />
            </button>
          </div>

{/* FOLLOW REQUEST INPUT + BUTTON */}
<div className="p-4 border-b border-border bg-white">

  <input
    type="text"
    placeholder="Enter username"
    value={followUsername}
    onChange={(e) => setFollowUsername(e.target.value)}
    className="w-full p-3 bg-gray-200 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 mb-3"
  />

  <button
    onClick={() => {
      if (!followUsername.trim()) {
        alert("Enter username first");
        return;
      }

      dispatch(sendFollowRequest(followUsername));
      setFollowUsername("");
      setShowFollowerModal(false);
    }}
    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
  >
    Send Follow Request
  </button>

</div>


          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <GoSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filteredFollowers.map((follower) => (
              <div
                key={follower.id}
                className="p-4 border-b flex items-center justify-between hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={follower.avatar}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{follower.name}</p>
                    <p className="text-xs text-gray-500">
                      @{follower.username}
                    </p>
                  </div>
                </div>

                <button
                  className={`rounded-full text-xs px-4 py-1 font-semibold ${
                    follower.isFollowing
                      ? "bg-gray-200 text-gray-700"
                      : "bg-linear-to-r from-blue-500 to-purple-600 text-white"
                  }`}
                >
                  {follower.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10">
        {/* Profile Header */}
        <div className="social-card p-5 md:p-8 mb-6 rounded-2xl shadow">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6 text-center md:text-left">
            {/* Avatar */}
            <img
              src={
                loggedUser?.profilePhoto
                  ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
                  : "/default-avatar.png"
              }
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />

            {/* User Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold break-all">
                    {loggedUser?.username || "Unknown User"}
                  </h1>
                  <p className="text-gray-500 text-sm md:text-base">
                    @{loggedUser?.username}
                  </p>
                </div>

                <button
                  onClick={() => setShowEditModal(true)}
                  className="rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 text-sm font-semibold"
                >
                  Edit Profile
                </button>
              </div>

{/* follow button */}
<button
  onClick={() => setShowFollowModal(true)}
  className="rounded-full font-semibold bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg px-6"
>
  Follow
</button>


              {/* Bio */}
              <p className="text-gray-700 mb-4 text-sm md:text-base wrap-break-words">
                {user.bio}
              </p>

              {/* Stats */}
              <div className="flex gap-6 justify-center md:justify-start text-center">
                <button className="hover:underline">
                  <p className="font-bold">{posts.length}</p>
                  <p className="text-sm text-gray-500">Posts</p>
                </button>

                <button
                  onClick={() => {
                    setShowFollowerModal(true);
                    setSearchQuery("");
                  }}
                  className="hover:underline"
                >
                  <p className="font-bold">
                    {(loggedUser.followers.length / 1000).toFixed(1)}K
                  </p>
                  <p className="text-sm text-gray-500">Followers</p>
                </button>

                <button
                  onClick={() => {
                    setShowFollowingModal(true);
                    setSearchQuery("");
                  }}
                  className="hover:underline"
                >
                  <p className="font-bold">
                    {(loggedUser.following.length / 1000).toFixed(1)}K
                  </p>
                  <p className="text-sm text-gray-500">Following</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center text-blue-600">
            <FiMessageSquare size={20} />
            <h2 className="text-lg md:text-xl font-bold">Posts</h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <BsGrid size={20} />
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <IoIosList size={20} />
            </button>
          </div>
        </div>

        {/* Posts */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }
        >
          {Array.isArray(posts) &&
            posts.map((post) => {
              const author =
                user && post.user && typeof post.user === "object"
                  ? {
                      name: loggedUser?.username,
                      email: loggedUser?.email,
                      avatar: loggedUser?.profilePhoto
                        ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
                        : "/default-avatar.png",
                    }
                  : null;

              return (
                <PostCard
                  key={post._id || post.id}
                  id={post._id || post.id}
                  author={author}
                  content={post.content}
                  timestamp={post.createdAt || "Some time ago"}
                  likes={post.likeCount || 0}
                  comments={post.comments?.length || 0}
                  shares={post.shares || 0}
                />
              );
            })}
        </div>

        {/* Modals */}
        {showFollowerModal && <FollowerModal />}
        {showFollowingModal && <FollowerModal isFollowing />}

        {/* EDIT PROFILE MODAL */}
        {showEditModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
            onClick={() => setShowEditModal(false)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b">
                <h2 className="text-lg md:text-xl font-bold">Edit Profile</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <IoCloseSharp size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 md:p-6 space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={
                      loggedUser?.profilePhoto
                        ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
                        : "/default-avatar.png"
                    }
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <button className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    Change Avatar
                  </button>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Username</label>
                  <div className="flex">
                    <span className="px-4 py-3 bg-gray-100 border border-r-0 rounded-l-xl text-gray-500">
                      @
                    </span>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) =>
                        setEditForm({ ...editForm, username: e.target.value })
                      }
                      className="flex-1 px-4 py-3 rounded-r-xl bg-gray-100 border focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm({ ...editForm, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border focus:ring-2 focus:ring-primary resize-none"
                  />
                  <p className="text-xs text-gray-500 text-right">
                    {editForm.bio.length}/150
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3 rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
     </div> 
     {/* follow modal */}
     {showFollowModal && (
  <FollowModal
    targetUsername={followUsername}
    setTargetUsername={setFollowUsername}
    onClose={() => setShowFollowModal(false)}
    onSend={handleSendRequest}
  />
)}

    </Layout>
  );
};

export default Profile;


