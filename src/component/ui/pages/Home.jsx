import { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";

import Layout from "../Layout";
import PostCard from "../PostCard";
import CreatePostModal from "../Createpostmodal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  // Initializing with sample posts
  useEffect(() => {
    setPosts([
      {
        id: "1",
        author: {
          name: "Sarah Johnson",
          username: "sarahj",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        },
        content:
          "Just finished an amazing hiking trip! The views were absolutely stunning. Nothing beats nature and fresh air 🏔️✨",
        timestamp: "2 hours ago",
        likes: 324,
        comments: 42,
        shares: 18,
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
          "Excited to announce that I just launched my new project! It combines AI with creative design. Check it out and let me know what you think! 🚀",
        timestamp: "4 hours ago",
        likes: 521,
        comments: 67,
        shares: 89,
      },
      {
        id: "3",
        author: {
          name: "Emma Davis",
          username: "emmadavis",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        },
        content:
          "Coffee and code - the perfect combination for a productive morning 💻☕",
        timestamp: "6 hours ago",
        likes: 892,
        comments: 124,
        shares: 56,
      },
      {
        id: "4",
        author: {
          name: "Michael Park",
          username: "mpark",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        },
        content:
          "Just captured this beautiful sunset moment. Sometimes the best things in life are free 🌅",
        timestamp: "8 hours ago",
        likes: 1203,
        comments: 156,
        shares: 92,
      },
    ]);
  }, []);

  const handleCreatePost = (content, visibility) => {
    const newPost = {
      id: String(posts.length + 1),
      author: {
        name: "You",
        username: "your_username",
        avatar:
          "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop",
      },
      content,
      timestamp: "just now",
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div
        className="border-b border-border relative overflow-hidden w-310"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=500&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/75 via-purple-900/65 to-indigo-900/50" />
        <div className="relative max-w-full mx-auto px-4 py-16 md:py-24 z-10">
          <h1
            className="text-6xl md:text-7xl font-black tracking-tighter mb-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "-0.02em",
            }}>
            <span className="w-full bg-linear-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-xl">
              Welcome to AURRA
            </span>
          </h1>
          <p
            className="text-white/95 text-xl md:text-2xl font-medium tracking-wide max-w-2xl leading-relaxed drop-shadow-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            Connect, share, and discover amazing content from your network
          </p>
        </div>
      </div>

      {/* Feed Container */}
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center py-8">
          <button className="px-6 py-3 rounded-full font-semibold bg-muted hover:bg-muted/70 text-foreground transition-all duration-200">
            Load More Posts
          </button>
        </div>
      </div>

      {/* Floating Create Post Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-5 w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center z-40"
        title="Create new post">
        <BsPlusLg size={28} />
      </button>


      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPost={handleCreatePost}
        userAvatar="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop"
        userName="You"/>
    </Layout>
  );
}
export default Home;