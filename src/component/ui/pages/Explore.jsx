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


const { posts } = useSelector((state) => state.articles);
const authData = JSON.parse(localStorage.getItem("user"));
  const loggedUser = authData?.user;

  const {valueFromChild}=useSelector((state)=>state.child);
   

   const lightMode={
    backgroundColor:"white",
    color:"black",
   
   }
   const darkMode={
    backgroundColor:"black",
    color:"gray",
    }

 
  const auth = useSelector((state) => state.Auth);
  const user = auth?.user ?? null;
  
  const filteredCreators = creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border bg-white" style={`${valueFromChild}`==='light'?darkMode:lightMode}>
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
                {
                Array.isArray(posts) &&
                posts.length > 0 && posts.map((post) => {
                  const author = user && post.user && typeof post.user === "object"
                ? 
                 {
                    name: loggedUser?.username || "Unknown User",
                    email: loggedUser?.email || "unknown",
                    avatar: loggedUser?.profilePhoto
                      ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
                      : "/default-avatar.png",
                  }: null;
                  return (<PostCard
                    key={post._id || post.id}
                    id={post._id || post.id}
                    author={author}
                    content={post.content}
                    timestamp={post.createdAt || "Some time ago"}
                    likes={post.likeCount || 0}
                    comments={post.comments || []}
                    shares={post.shares || 0}
                  />
                  );
                }
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {Array.isArray(posts) &&
                posts.length > 0 && posts.map((post) => {
                  const author = user && post.user && typeof post.user === "object"
                ? 
                 {
                    name: loggedUser?.username || "Unknown User",
                    email: loggedUser?.email || "unknown",
                    avatar: loggedUser?.profilePhoto
                      ? `data:image/jpeg;base64,${loggedUser.profilePhoto}`
                      : "/default-avatar.png",
                  }: null;
                  return (<PostCard
                    key={post._id || post.id}
                    id={post._id || post.id}
                    author={author}
                    content={post.content}
                    timestamp={post.createdAt || "Some time ago"}
                    likes={post.likeCount || 0}
                    comments={post.comments || []}
                    shares={post.shares || 0}
                  />
                  );
                }
                )}
               
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