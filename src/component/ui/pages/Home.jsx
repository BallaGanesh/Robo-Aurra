import { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";

import Layout from "../Layout";
import PostCard from "../PostCard";
import CreatePostModal from "../CreatePostModal";
import { postArticle } from "../../features/articleSlice";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../features/articleSlice";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { posts } = useSelector((state) => state.articles);

  const authData = JSON.parse(localStorage.getItem("user"));
  const loggedUser = authData?.user;

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Auth);
  const user = auth?.user ?? null;
  


  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const handleCreatePost = (content, visibility, title) => {
    console.log("Post requested:", title, content);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    dispatch(postArticle(formData))
      .unwrap()
      .then((res) => {
        console.log("SUCCESS:", res);
        dispatch(getAllPosts());
      })
      .catch((err) => console.log("ERROR:", err));
  };

  return (
    <Layout>
      {/* MINI HERO FOR LOGGED IN USERS */}
      {/* <div className="relative py-8 md:py-12 px-4 md:px-8 bg-linear-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Welcome back,{" "}
                <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {user?.username}
                </span>
                ! 👋
              </h1>
              <p className="text-muted-foreground">
                What's on your mind today?
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="relative overflow-hidden py-10 md:py-14 px-4 md:px-8 rounded-b-3xl shadow-sm
  bg-linear-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10">

  {/* Animated blobs */}
  <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
  <div className="absolute top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

  <div className="relative max-w-6xl mx-auto flex  flex-col md:flex-row md:items-center md:justify-center gap-8">

    {/* Text Section */}
    <div className="text-center ">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3">
        Welcome back,{" "}
        <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {user?.username}
        </span>
        👋
      </h1>

      <p className="text-muted-foreground text-lg">
        Ready to share something today?
      </p>
    </div>

  </div>
</div>


      {/* FEED SECTION */}
      <div className="py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => {
                // handle cases where post.user is a string (just an ID)

                const author =
                  user && post.user && typeof post.user === "object"
                    ? {
                        name: loggedUser?.username || "Unknown User",
                        email: loggedUser?.email || "unknown",
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
                    comments={post.comments || []}
                    shares={post.shares || 0}
                  />
                );
              })
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No posts yet. Create one to get started!
                </p>
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
        userAvatar={user?.profilePhoto || user?.avatar || "/logo.png"}
        userName={user?.name || "You"}
      />

      {/* Floating Create Post Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        title="Create new post"
        className="
          fixed bottom-20 right-5 w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white
          flex items-center justify-center transition-all duration-300 shadow-xl shadow-purple-500/40 
          md:bottom-6 hover:shadow-2xl hover:shadow-purple-500/60 hover:scale-110 active:scale-95
          group z-50">
        <BsPlusLg
          size={28}
          className="
            transition-transform duration-300
            group-hover:rotate-90"/>
      </button>
    </Layout>
  );
};
export default Home;
