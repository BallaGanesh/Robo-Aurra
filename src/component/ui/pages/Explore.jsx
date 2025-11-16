import { useState } from "react";
import Layout from "../Layout";
import PostCard from "../PostCard";

import { CiSearch } from "react-icons/ci";
import { IoMdGrid } from "react-icons/io";
import { IoListOutline } from "react-icons/io5";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState("grid");

  const [creators, setCreators] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      followers: 15420,
      isFollowing: false,
    },
    {
      id: "2",
      name: "Alex Chen",
      username: "alexchen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      followers: 28340,
      isFollowing: false,
    },
    {
      id: "3",
      name: "Emma Davis",
      username: "emmadavis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      followers: 42100,
      isFollowing: true,
    },
    {
      id: "4",
      name: "Michael Park",
      username: "mpark",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      followers: 9850,
      isFollowing: false,
    },
  ]);

  const trendingHashtags = [
    { name: "#WebDesign", posts: 245000 },
    { name: "#Innovation", posts: 189000 },
    { name: "#TechTrends", posts: 156000 },
    { name: "#Creative", posts: 142000 },
    { name: "#StartupLife", posts: 128000 },
  ];

  const trendingPosts = [
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        username: "sarahj",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      },
      content:
        "Just finished an amazing hiking trip! The views were absolutely stunning.",
      timestamp: "2 hours ago",
      likes: 5234,
      comments: 342,
      shares: 218,
    },
    {
      id: "2",
      author: {
        name: "Alex Chen",
        username: "alexchen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      },
      content:
        "Excited to announce that I just launched my new project combining AI with creative design!",
      timestamp: "4 hours ago",
      likes: 8521,
      comments: 1067,
      shares: 2189,
    },
  ];

  const filteredCreators = creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold gradient-text mb-4 bg-linear-to-r  from-purple-600 to-blue-500 w-25 bg-clip-text text-transparent">Explore</h1>

          {/* Search */}
          <div className="relative mb-4 ">
            <CiSearch 
              className="size-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, hashtags..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"/>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-t border-border pt-4 ">
            {["posts", "hashtags"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 font-semibold transition-all duration-200 border-b-2 ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}>
                {tab === "posts" ? "Posts" : "Hashtags"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === "posts" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Trending Posts</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`icon-button ${
                    viewMode === "grid"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                  <IoMdGrid className="text-2xl text-gray-500 hover:rounded-full hover:bg-gray-200 hover:text-blue-500  p-0.5 "/>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`icon-button ${
                    viewMode === "list"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                  <IoListOutline className="text-2xl text-gray-500 hover:rounded-full hover:bg-gray-200 hover:text-blue-500 m-2 p-0.5 " />
                </button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingPosts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {trendingPosts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "hashtags" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Trending Hashtags</h2>
            <div className="space-y-3">
              {trendingHashtags.map((hashtag, idx) => (
                <div
                  key={idx}
                  className="social-card p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer transition-all duration-200">
                  <div>
                    <p className="font-semibold text-primary">{hashtag.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(hashtag.posts / 1000).toFixed(0)}K posts
                    </p>
                  </div>

                  {/* <div
                    className={`text-sm font-semibold ${
                      hashtag.trend === "up"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {hashtag.trend === "up" ? "↑" : "↓"} Trending
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Explore;