import { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../Layout";
import PostCard from "../PostCard";
import CreatePostModal from "../CreatePostModal";

import { getAllPosts, postArticle } from "../../features/articleSlice";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.articles);
  const auth = useSelector((state) => state.Auth);
  const user = auth?.user ?? null;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const handleCreatePost = (content, visibility, title) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    dispatch(postArticle(formData))
      .unwrap()
      .then(() => dispatch(getAllPosts()))
      .catch((err) => console.log("ERROR CREATING POST:", err));
  };

  return (
    <Layout>
      {/* HERO SECTION */}
      <div
        className="relative overflow-hidden py-10 md:py-14 px-4 md:px-8 rounded-b-3xl shadow-sm
        bg-linear-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"
      >
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Welcome back,{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {user?.username}
            </span>
            👋
          </h1>

          <p className="text-muted-foreground text-lg">Ready to share something today?</p>
        </div>
      </div>

      {/* POSTS FEED */}
      <div className="py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => {
                const postUser = post.user && typeof post.user === "object" ? post.user : null;

                const author = {
                  name: postUser?.username || user?.username || "Unknown User",
                  email: postUser?.email || user?.email || "",
                  avatar: postUser?.profilePhoto
                    ? `data:image/jpeg;base64,${postUser.profilePhoto}`
                    : user?.profilePhoto
                    ? `data:image/jpeg;base64,${user.profilePhoto}`
                    : "/default-avatar.png",
                };

                return (
                  <PostCard
                    key={post._id || post.id}
                    id={post._id || post.id}
                    author={author}
                    title={post.title}               // <- PASS TITLE
                    content={post.content}
                    timestamp={post.createdAt}
                    likes={post.likeCount || 0}
                    comments={post.comments || []}
                    shares={post.shares || 0}
                  />
                );
              })
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No posts yet. Create one to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPost={handleCreatePost}
        userAvatar={
          user?.profilePhoto ? `data:image/jpeg;base64,${user.profilePhoto}` : user?.avatar || "/logo.png"
        }
        userName={user?.username || "You"}
      />

      {/* Floating Create Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        title="Create new post"
        className="fixed bottom-20 right-5 w-16 h-16 rounded-full bg-linear-to-r 
        from-blue-500 to-purple-600 text-white flex items-center justify-center 
        transition-all duration-300 shadow-xl shadow-purple-500/40 md:bottom-6 
        hover:shadow-2xl hover:shadow-purple-500/60 hover:scale-110 active:scale-95
        group z-50"
      >
        <BsPlusLg size={28} className="transition-transform duration-300 group-hover:rotate-90" />
      </button>
    </Layout>
  );
};

export default Home;
