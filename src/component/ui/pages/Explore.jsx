


import { useState } from "react";
import Layout from "../Layout";
import PostCard from "../PostCard";

import { CiSearch } from "react-icons/ci";
import { IoMdGrid } from "react-icons/io";
import { IoListOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState("grid");

  const trendingHashtags = [
    { name: "#WebDesign", posts: 245000 },
    { name: "#Innovation", posts: 189000 },
  ];

  const { posts } = useSelector((state) => state.articles);
  const auth = useSelector((state) => state.Auth);
  const loggedUser = auth?.user ?? null;

  const { valueFromChild } = useSelector((state) => state.child);

  const lightMode = { backgroundColor: "white", color: "black" };
  const darkMode = { backgroundColor: "black", color: "gray" };

  // ⭐ RESOLVE AUTHOR BASED ON followers / following / loggedUser
  const resolveAuthor = (postUser) => {
    if (!postUser || !loggedUser) {
      return {
        name: "Unknown User",
        avatar: "/default-avatar.png",
      };
    }

    // 1️⃣ Logged-in user
    if (loggedUser._id === postUser._id) {
      return {
        name: loggedUser.username,
        avatar: loggedUser.profilePhoto
          ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
          : "/default-avatar.png",
      };
    }

    // 2️⃣ Check followers
    const followerMatch = loggedUser.followers?.find(
      (u) => u._id === postUser._id
    );
    if (followerMatch) {
      return {
        name: followerMatch.username,
        avatar: followerMatch.profilePhoto
          ? `data:image/jpeg;base64,${followerMatch.profilePhoto}`
          : "/default-avatar.png",
      };
    }

    // 3️⃣ Check following
    const followingMatch = loggedUser.following?.find(
      (u) => u._id === postUser._id
    );
    if (followingMatch) {
      return {
        name: followingMatch.username,
        avatar: followingMatch.profilePhoto
          ? `data:image/jpeg;base64,${followingMatch.profilePhoto}`
          : "/default-avatar.png",
      };
    }

    return {
      name: "Unknown User",
      avatar: "/default-avatar.png",
    };
  };

  return (
    <Layout>
      {/* Header */}
      <div
        className="sticky top-0 z-30 bg-card border-b border-border bg-white"
        style={`${valueFromChild}` === "light" ? darkMode : lightMode}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold gradient-text mb-4 bg-linear-to-r from-purple-600 to-blue-500 w-25 bg-clip-text text-transparent">
            Explore
          </h1>

          {/* Search */}
          <div className="relative mb-4">
            <CiSearch className="size-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, hashtags..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-t border-border pt-4">
            {["posts", "hashtags"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 font-semibold transition-all duration-200 border-b-2 ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "posts" ? "Posts" : "Hashtags"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === "posts" && (
          <>
            {/* Header Row */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Trending Posts</h2>
              <div className="flex gap-2">
                <button onClick={() => setViewMode("grid")}>
                  <IoMdGrid className="text-2xl text-gray-500 hover:bg-gray-200 rounded p-1" />
                </button>
                <button onClick={() => setViewMode("list")}>
                  <IoListOutline className="text-2xl text-gray-500 hover:bg-gray-200 rounded p-1" />
                </button>
              </div>
            </div>

            {/* GRID MODE */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => {
                  const author = resolveAuthor(post.user);

                  return (
                    <PostCard
                      key={post._id}
                      id={post._id}
                      author={author}
                      title={post.title}   // ⭐ ADDED TITLE
                      content={post.content}
                      timestamp={post.createdAt}
                      likes={post.likeCount || 0}
                      comments={post.comments || []}
                      shares={post.shares || 0}
                    />
                  );
                })}
              </div>
            ) : (
              // LIST MODE
              <div className="space-y-4">
                {posts.map((post) => {
                  const author = resolveAuthor(post.user);

                  return (
                    <PostCard
                      key={post._id}
                      id={post._id}
                      author={author}
                      title={post.title}   // ⭐ ADDED TITLE
                      content={post.content}
                      timestamp={post.createdAt}
                      likes={post.likeCount || 0}
                      comments={post.comments || []}
                      shares={post.shares || 0}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* HASHTAGS TAB */}
        {activeTab === "hashtags" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Trending Hashtags</h2>

            {trendingHashtags.map((tag, i) => (
              <div key={i} className="social-card p-4 flex justify-between">
                <div>
                  <p className="font-semibold text-primary">{tag.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(tag.posts / 1000).toFixed(0)}K posts
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Explore;
