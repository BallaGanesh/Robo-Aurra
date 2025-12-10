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
  author,
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
  const user = auth?.user ?? null;

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setCurrentLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // COMMENT API
  const handleAddComment = async (postId) => {
    if (!commentText.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://robo-zv8u.onrender.com/api/articles/${postId}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCommentsList((prev) => [...prev, response.data.comment]);
      setCommentText("");
    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  return (
    <div className="social-card bg-card rounded-2xl border border-gray-300 border-border shadow-md hover:shadow-xl transition-all overflow-hidden">
      {/* Post header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              user?.profilePhoto
                ? `data:image/jpeg;base64,${user.profilePhoto}`
                : "/default-avatar.png"
            }
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="font-semibold">{user?.username || "Unknown User"}</p>
            <p className="text-xs text-gray-500">
              @{user?.username || "unknown"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-xs text-gray-500 text-muted-foreground">
            {dayjs(timestamp).fromNow()}
          </span>
          <button className="icon-button text-muted-foreground hover:text-primary p-2 rounded-lg">
            <FiMoreHorizontal className="text-2xl text-gray-500 rounded-full hover:rounded-full hover:bg-gray-200 p-0.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">{content}</div>

      {/* Actions */}
      <div className="px-2 sm:px-4 py-2 sm:py-3 border-t border-gray-300 border-border flex items-center justify-around gap-1 sm:gap-2">
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
          className="flex gap-2"
        >
          <TbMessageCircle className="text-xl" />
          <span>
            {Array.isArray(commentsList) ? commentsList.length : commentsList}
          </span>
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

      {/* ✅ INLINE ATTACHED COMMENT SECTION (FIXED) */}
      {showComments && (
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          {/* Add Comment */}
          <div className="flex gap-2 mb-3">
            <input
              className="border border-gray-300 rounded-lg p-2 flex-1 text-sm focus:outline-none"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
            />
            <button
              className="bg-blue-500 text-white px-4 rounded-lg text-sm"
              onClick={() => handleAddComment(id)}
            >
              Post
            </button>
            <button
              onClick={() => setShowComments(false)}
              className="text-gray-500 text-sm px-2"
            >
              ✖
            </button>
          </div>

          {/* Comment List */}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {Array.isArray(commentsList) && commentsList.length > 0 ? (
              commentsList.map((c, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800"
                >
                  {c?.text}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
