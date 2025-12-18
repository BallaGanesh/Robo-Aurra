import { useState, useContext } from "react";
import PostCard from "../PostCard";
import Layout from "../Layout";
import FollowModal from "./FollowModal";

import { IoCloseSharp } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { IoIosList } from "react-icons/io";
import { BsGrid } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import {
  sendFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
} from "../../features/followSlice";

import { SocketContext } from "./../../../Socket/SocketProvider";
import { NotificationContext } from "../../../Notifications/NotificationProvider";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState("grid");
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const { addNotification } = useContext(NotificationContext);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followUsername, setFollowUsername] = useState("");

  const { socket } = useContext(SocketContext);

  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    bio: "Passionate about design, code, and coffee ☕ | Building beautiful digital experiences",
  });

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.Auth);
  const user = auth?.user ?? null;

  const posts = useSelector((state) => state.articles.posts);

   
  const loggedUser = user;

  // !! BACKEND REAL FOLLOWERS & FOLLOWING
  const followersList = loggedUser?.followers || [];
  const followingList = loggedUser?.following || [];

  //  filter posts by logged-in user
  const userPosts = Array.isArray(posts)
    ? posts.filter((post) => String(post.user?._id) === String(loggedUser?._id))
    : [];

  // handle send follow request
  const handleSendRequest = async () => {
    if (!followUsername.trim()) {
      alert("Please enter a username");
      return;
    }

    try {
      await dispatch(sendFollowRequest(followUsername)).unwrap();

      if (socket && socket.connected) {
        socket.emit("sendFollowRequest", {
          from: loggedUser.username,
          fromId: loggedUser._id,
          toUsername: followUsername,
        });
      }

      setFollowUsername("");
      setShowFollowModal(false);
    } catch (err) {
      console.log(err);

      if (
        err === "Follow request already sent" ||
        err?.message?.includes("already")
      ) {
        addNotification({
          type: "follow",
          from: loggedUser.username,
          fromId: loggedUser._id,
          timestamp: "Just now",
        });

        setFollowUsername("");
        setShowFollowModal(false);
      }
    }
  };

  //  MODAL — NOW USES REAL BACKEND FOLLOWERS
  const FollowerModal = ({ isFollowing }) => {
    const list = isFollowing ? followingList : followersList;
    const title = isFollowing ? "Following" : "Followers";

    const filtered = list.filter((f) => {
      const username = f.username || "";
      return username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
        onClick={() => {
          setShowFollowerModal(false);
          setShowFollowingModal(false);
        }}>
        <div
          // className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-hidden animate-scale-in flex flex-col"
          className="bg-white dark:bg-gray-900
             text-black dark:text-gray-100
             border border-gray-200 dark:border-gray-700
             rounded-2xl w-full max-w-md max-h-[85vh]
             overflow-hidden animate-scale-in flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-300">
            <h2 className="text-lg md:text-xl font-bold">
              {title}
              {!isFollowing && " (accepted your request)"}
            </h2>
            <button
              onClick={() => {
                setShowFollowerModal(false);
                setShowFollowingModal(false);
              }}
              className="text-muted-foreground">
              <IoCloseSharp size={24} />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-300">
            <div className="relative">
              <GoSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"/>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full outline-none focus:outline-none focus:ring-0 bg-gray-100 border  focus:ring-primary"/>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-4 text-gray-500 text-sm">No {title} found.</p>
            ) : (
              filtered.map((follower) => (
                <div
                  key={follower._id}
                  className="p-4 border-b flex items-center justify-between hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        follower.profilePhoto
                          ? `data:image/jpeg;base64,${follower.profilePhoto}`
                          : "/default-avatar.png"
                      }
                      className="w-10 h-10 rounded-full object-cover"/>

                    <div>
                      <p className="font-semibold text-sm">{follower.username}</p>
                      <p className="text-xs text-gray-500">@{follower.username}</p>
                    </div>
                  </div>

                  <button
                    className={`rounded-full text-xs px-4 py-1 font-semibold ${
                      isFollowing
                        ? "bg-gray-200 text-gray-700"
                        : "bg-blue-500 text-white"
                    }`}>
                    {isFollowing ? "Following" : "Follower"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className = "max-w-6xl mx-auto  px-4 py-6 md:py-10">
        {/* Profile Header */}
        <div className="social-card p-5 md:p-8 mb-6 rounded-2xl shadow-xl ">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6 text-center md:text-left">
            {/* Avatar */}
            <img
              src={
                loggedUser?.profilePhoto
                  ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
                  : "/default-avatar.png"
              }
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover cursor-pointer"
              onClick = {() => loggedUser?.profilePhoto && setOpenPreview(true)}/>

            {/* User Info */}
            <div className="flex-1 w-full flex flex-col">
              <div className="flex flex-col  md:flex-row md:items-center md:justify-between gap-4 mb-4 ">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold break-all ml-5">{loggedUser?.username || "Unknown User"}</h1>
                  <p className="text-gray-500 ml-5 text-sm md:text-base">@{loggedUser?.username}</p>
                </div>

                <button
                  onClick={() => setShowEditModal(true)}
                  className="rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 text-md font-semibold">
                  Edit Profile
                </button>
              </div>

              {/* Follow Button */}
              <button
                onClick={() => setShowFollowModal(true)}
                className="rounded-full w-35 p-1.5 self-end font-semibold bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg px-6">
                Search Users
              </button>

              {/* Bio */}
              <p className="text-gray-700 mb-4 text-sm md:text-base wrap-break-words">{user?.bio}</p>

              {/* Stats */}
              <div className="flex gap-10 justify-center md:justify-start text-center ml-5">
                <button className="hover:underline">
                  <p className="font-bold">{userPosts.length}</p>
                  <p className="text-sm text-gray-500">Posts</p>
                </button>

                <button
                  onClick={() => {
                    setShowFollowerModal(true);
                    setSearchQuery("");
                  }}
                  className="hover:underline">
                  <p className="font-bold">{followersList.length}</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </button>

                <button
                  onClick={() => {
                    setShowFollowingModal(true);
                    setSearchQuery("");
                  }}
                  className="hover:underline">
                  <p className="font-bold">{followingList.length}</p>
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
              }`}>
              <BsGrid size={20} />
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}>
              <IoIosList size={20} />
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }>
          {userPosts.map((post) => {
            const postUser = post.user;
            
            // console.log(postUser);
            

            const author = {
              name: loggedUser.username,
              avatar: loggedUser.profilePhoto
                ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
                : "/default-avatar.png",
            };

            return (
              <PostCard
                key={post._id}
                id={post._id}
                title={post.title}
                author={author}
                content={post.content}
                timestamp={post.createdAt}
                likes={post.likeCount || 0}
                comments={post.comments || []}/>
            );
          })}
        </div>

        {/* Modals */}
        {showFollowerModal && <FollowerModal />}
        {showFollowingModal && <FollowerModal isFollowing />}

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
            onClick={() => setShowEditModal(false)}>
            <div
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            //   className="bg-white dark:bg-gray-900
            //  text-black dark:text-gray-100
            //  border border-gray-200 dark:border-gray-700
            //  rounded-2xl max-w-lg w-full max-h-[90vh]
            //  overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b">
                <h2 className="text-lg md:text-xl font-bold">Edit Profile</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-800">
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
                    className="w-28 h-28 rounded-full object-cover"/>
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
                      className="flex-1 px-4 py-3 rounded-r-xl bg-gray-100 border focus:ring-2 focus:ring-primary"/>
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
          //           className="w-full px-4 py-3 rounded-xl
          //  bg-gray-100 dark:bg-gray-800
          //  border border-gray-300 dark:border-gray-600
          //  text-black dark:text-gray-100
          //  focus:ring-2 focus:ring-primary"

                  />
                  <p className="text-xs text-gray-500 text-right">
                    {editForm.bio.length}/150
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3 rounded-full bg-gray-200 hover:bg-gray-300">
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3 rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Follow Modal */}
      {showFollowModal && (
        <FollowModal
          targetUsername={followUsername}
          setTargetUsername={setFollowUsername}
          onClose={() => setShowFollowModal(false)}
          onSend={handleSendRequest}/>
      )}
    </Layout>
  );
};

export default Profile;