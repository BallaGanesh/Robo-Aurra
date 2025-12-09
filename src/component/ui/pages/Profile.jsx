import { useState } from "react";
import PostCard from '../PostCard';
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
    name: "You",
    username: "your_username",
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
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      isFollowing: true,
    },
    {
      id: "2",
      name: "Alex Chen",
      username: "alexchen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      isFollowing: false,
    },
    {
      id: "3",
      name: "Emma Davis",
      username: "emmadavis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      isFollowing: true,
    },
    {
      id: "4",
      name: "Michael Park",
      username: "mpark",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      isFollowing: false,
    },
  ];

  const { posts } = useSelector((state) => state.articles);

  const auth = useSelector((state) => state.Auth);
  const user = auth?.user ?? null;

  const authData = JSON.parse(localStorage.getItem("user"));
  const loggedUser = authData?.user;

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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => {
          setShowFollowerModal(false);
          setShowFollowingModal(false);
        }}>
        <div
          className="bg-card rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden animate-scale-in flex flex-col"
          onClick={(e) => e.stopPropagation()}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10 bg-white">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={() => {
                setShowFollowerModal(false);
                setShowFollowingModal(false);
              }}
              className="icon-button text-muted-foreground hover:text-foreground">
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
          <div className="p-4 border-b border-border bg-white">
            <div className="relative">
              <GoSearch
                size={18}
                className="absolute text-gray-600 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-300 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground placeholder-muted-foreground"/>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto bg-white">
            {filteredFollowers.map((follower) => (
              <div
                key={follower.id}
                className="p-4 border-b border-border flex items-center justify-between hover:bg-muted/30 transition-all">
                <div className="flex items-center gap-3">
                  <img
                    src={follower.avatar}
                    alt={follower.name}
                    className="w-10 h-10 rounded-full object-cover"/>
                  <div>
                    <p className="font-semibold text-sm">{follower.name}</p>
                    <p className="text-xs text-muted-foreground">@{follower.username}</p>
                  </div>
                </div>
                <button
                  size="sm"
                  className={`rounded-full font-semibold text-xs ${
                    follower.isFollowing
                      ? "bg-muted text-foreground hover:bg-muted/70"
                      : "bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg"
                  }`}>
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="social-card p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-start gap-6 mb-6">
            {/* Avatar */}
            <img
              src={loggedUser?.profilePhoto
                      ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
                      : "/default-avatar.png"}
              alt={loggedUser?.username || "Unknown User"}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"/>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  {/* <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1> */}
                  <h1 className="text-2xl md:text-3xl font-bold">{loggedUser?.username || "Unknown User"}</h1>
                  <p className="text-muted-foreground text-lg">@{loggedUser?.username || "Unknown User"}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="rounded-full font-semibold bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg px-6">
                    {/* <Edit size={18} /> */}
                    Edit Profile
                  </button>
                  <button className="rounded-full font-semibold bg-muted text-foreground hover:bg-muted/70 px-6">
                    {/* <MessageCircle size={18} /> */}
                  </button>
                </div>
              </div>

{/* follow button */}
<button
  onClick={() => setShowFollowModal(true)}
  className="rounded-full font-semibold bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg px-6"
>
  Follow
</button>


              {/* Bio */}
              <p className="text-foreground mb-4">{user.bio}</p>

              {/* Stats */}
              <div className="flex gap-6">
                <button className="hover:underline">
                  <p className="font-bold">{posts.length}</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </button>
                <button
                  onClick={() => {
                    setShowFollowerModal(true);
                    setSearchQuery("");
                  }}
                  className="hover:underline">
                  <p className="font-bold">{(loggedUser.followers / 1000).toFixed(1)}K</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </button>
                <button
                  onClick={() => {
                    setShowFollowingModal(true);
                    setSearchQuery("");
                  }}
                  className="hover:underline">
                  <p className="font-bold">{(loggedUser.following / 1000).toFixed(1)}K</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 md:gap-8 border-b border-border mb-6 px-4">
          <button className="pb-4 px-2 font-semibold transition-all duration-200 border-b-2 border-primary text-primary flex items-center gap-2">
            {/* <MessageSquare size={18} /> */}
            <span className="hidden md:inline">Posts</span>
          </button>
        </div>

        {/* View Mode */}
        <div className="flex justify-between items-center mb-6 px-4">
          <h2 className="text-lg font-bold">Posts</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`icon-button ${
                viewMode === "grid"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              {/* <Grid size={20} /> */}
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`icon-button ${
                viewMode === "list"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              {/* <List size={20} /> */}
            </button>
          </div>
        </div>

        {/* Posts */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }>
          
          {Array.isArray(posts) &&
            posts.length > 0 &&
            posts.map((post) => {
              // handle cases where post.user is a string (just an ID)

              const author = user && post.user && typeof post.user === "object"
                ? 
                 {
                    name: loggedUser?.username || "Unknown User",
                    email: loggedUser?.email || "unknown",
                    avatar: loggedUser?.profilePhoto
                      ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
                      : "/default-avatar.png",
                  }: null;
              
               
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

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowEditModal(false)}>
          <div
            className="bg-card rounded-2xl max-w-2xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="icon-button text-muted-foreground hover:text-foreground">
                <IoCloseSharp size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={loggedUser?.profilePhoto
                      ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
                      : "/default-avatar.png"}
                  alt="Profile avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"/>
                <button className="rounded-full bg-muted text-foreground hover:bg-muted/70">
                  Change Avatar
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Name</label>
                  <input
                    type="text"
                    value={loggedUser?.username || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    placeholder="Your name"/>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Username</label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 bg-muted rounded-l-xl border border-border border-r-0 text-muted-foreground">@</span>
                    <input
                      type="text"
                      value={loggedUser?.username || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, username: e.target.value })
                      }
                      className="flex-1 px-4 py-3 rounded-r-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="username"/>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm({ ...editForm, bio: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                    placeholder="Tell us about yourself"
                    rows={4}/>
                  <p className="text-xs text-muted-foreground text-right">{editForm.bio.length}/150</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 rounded-full bg-muted text-foreground hover:bg-muted/70">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                  }}
                  className="flex-1 rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg">
                  Save Changes
                </button>
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
