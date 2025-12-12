import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";

dayjs.extend(relativeTime);

const PostCard = ({
  id,
  author,    //  username + avatar
  title,      //  NEW: article title
  content,
  timestamp,
  likes,
  comments,
  shares,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState(
    Array.isArray(comments) ? comments : []
  );
  const [commentText, setCommentText] = useState("");

  const auth = useSelector((state) => state.Auth);
  const loggedUser = auth?.user ?? null;
  const user = auth?.user ?? null;
 

  // LIKE
  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // COMMENT API
  const handleAddComment = async (postId) => {
    if (!commentText.trim()) return;

    try {
      const token = auth.token;

      const response = await axios.post(
        `https://robo-zv8u.onrender.com/api/articles/${postId}/comment`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newComment = response.data.comment || response.data;
<<<<<<< HEAD

      // FIX: Add username locally so UI updates instantly
      
      // setCommentsList((prev) => [
      //   ...prev,
      //   {
      //     text: newComment.text,
      //     user: {
      //       username: loggedUser?.username,
      //       profilePhoto: loggedUser?.profilePhoto,
      //     },
      //   },
      // ]);
=======
>>>>>>> 518ff696f7d9bce246d56ed3ae0506203b80ec3a
      setCommentsList((prev) => [
  ...prev,
  {
    text: newComment.text,
    user: {
      username: loggedUser?.username || "Unknown User",
      profilePhoto: loggedUser?.profilePhoto || null,
    }
  }
]);


      setCommentText("");
    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  return (
    <div className="social-card bg-card rounded-2xl border border-gray-300 shadow-md hover:shadow-xl transition-all overflow-hidden">

      {/* ------------ HEADER ------------ */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={author?.avatar ? author.avatar : "/default-avatar.png"}
            className="w-10 h-10 rounded-full"
            alt="profile"/>

          <div>
<<<<<<< HEAD
            <p className="font-semibold">{author?.name || "Unknown User"}</p>
            <p className="text-xs text-gray-500">@{author?.name?.toLowerCase() || "unknown"}</p>
=======
            <p className="font-semibold">{author.name || "Unknown User"}</p>
            <p className="text-xs text-gray-500">
              @{author?.name?.toLowerCase() || "unknown"}
            </p>
>>>>>>> 518ff696f7d9bce246d56ed3ae0506203b80ec3a
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">{dayjs(timestamp).fromNow()}</span>
          <button className="icon-button hover:bg-gray-200 p-2 rounded-lg">
            <FiMoreHorizontal className="text-2xl text-gray-500" />
          </button>
        </div>
      </div>

      {/* ------------ TITLE ------------ */}
      {title && (
        <div className="px-4 pb-1">
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
      )}

      {/* ------------ CONTENT ------------ */}
      <div className="px-4 pb-4">{content}</div>

      {/* ------------ ACTIONS ------------ */}
      <div className="px-4 py-3 border-t border-gray-300 flex justify-around">
        {/* LIKE */}
        <button onClick={handleLike} className="flex gap-2">
          {isLiked ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-xl" />
          )}
          <span>{currentLikes}</span>
        </button>

        {/* COMMENTS */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex gap-2">
          <TbMessageCircle className="text-xl" />
          <span>{commentsList.length}</span>
        </button>

        {/* SHARE */}
        <button className="flex gap-2">
          <FiShare2 className="text-xl" />
          <span>{shares}</span>
        </button>

        {/* SAVE */}
        <button onClick={() => setIsSaved(!isSaved)} className="flex gap-2">
          <FaRegBookmark className="text-xl" />
        </button>
      </div>

      {/* ------------ COMMENT POPUP ------------ */}
      {showComments && (
      <div className="px-4 pb-4 mt-2">

        {/* COMMENT BOX */}
        <div className="border border-gray-400 rounded-xl bg-white shadow-sm max-h-72 flex flex-col overflow-hidden">

          {/* COMMENTS SCROLL AREA */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {commentsList.length > 0 ? (
              commentsList.map((c, index) => (
                <div key={index} className="flex gap-3 items-start">
                  {/* Avatar */}
                  <img
                    src={c.user?.profilePhoto || "/default-avatar.png"}
                    className="w-8 h-8 rounded-full object-cover"/>

                  <div>
                    <p className="font-semibold text-sm">{c.user?.username || "Anonymous"}</p>
                    <p className="text-gray-700 text-sm">{c.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No comments yet.</p>
            )}
          </div>

          {/* STICKY INPUT BAR */}
          <div className="border-t px-3 py-2 bg-white flex items-center gap-2 sticky bottom-0">
            <input
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}/>

            <button
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full"
              onClick={() => handleAddComment(id)}>
              Post
            </button>
          </div>
        </div>
      </div>
      )}

    </div>
  );
};

export default PostCard;