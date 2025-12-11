// import { useState } from "react";
// import { FiMoreHorizontal } from "react-icons/fi";
// import { FaRegHeart, FaHeart } from "react-icons/fa6";
// import { TbMessageCircle } from "react-icons/tb";
// import { FiShare2 } from "react-icons/fi";
// import { FaRegBookmark } from "react-icons/fa";
// import axios from "axios";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { useSelector } from "react-redux";

// dayjs.extend(relativeTime);

// const PostCard = ({
//   id,
//   author, // 👈 THIS contains username + avatar of post owner
//   content,
//   timestamp,
//   likes,
//   comments,
//   shares,
// }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const [currentLikes, setCurrentLikes] = useState(likes);
//   const [showComments, setShowComments] = useState(false);
//   const [commentsList, setCommentsList] = useState(
//     Array.isArray(comments) ? comments : []
//   );
//   const [commentText, setCommentText] = useState("");

//   const auth = useSelector((state) => state.Auth);
//   const loggedUser = auth?.user ?? null;

//   const handleLike = () => {
//     setIsLiked(!isLiked);
//     setCurrentLikes((prev) => (isLiked ? prev - 1 : prev + 1));
//   };

//   const handleAddComment = async (postId) => {
//     if (!commentText.trim()) return;

//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         `https://robo-zv8u.onrender.com/api/articles/${postId}/comment`,
//         { text: commentText },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const newComment = response.data.comment || response.data;
//       setCommentsList((prev) => [...prev, newComment]);
//       setCommentText("");
//     } catch (error) {
//       console.error("Comment error:", error);
//     }
//   };

//   return (
//     <div className="social-card bg-card rounded-2xl border shadow-md hover:shadow-xl transition-all overflow-hidden">
//       {/* -------- HEADER FIXED ✔ ------------ */}
//       <div className="p-4 flex items-center justify-between ">
//         <div className="flex items-center gap-3">
//           <img
//             src={author?.avatar ? author.avatar : "/default-avatar.png"}
//             className="w-10 h-10 rounded-full"
//             alt="profile"
//           />

//           <div>
//             <p className="font-semibold">{author?.name || "Unknown User"}</p>
//             <p className="text-xs text-gray-500">
//               @{author?.name?.toLowerCase() || "unknown"}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-1">
//           <span className="text-xs text-gray-500">
//             {dayjs(timestamp).fromNow()}
//           </span>
//           <button className="icon-button hover:bg-gray-200 p-2 rounded-lg">
//             <FiMoreHorizontal className="text-2xl text-gray-500" />
//           </button>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="px-4 pb-4">{content}</div>

//       {/* ACTIONS */}
//       <div className="px-4 py-3 border-t flex justify-around">
//         <button onClick={handleLike} className="flex gap-2">
//           {isLiked ? (
//             <FaHeart className="text-red-500 text-xl" />
//           ) : (
//             <FaRegHeart className="text-xl" />
//           )}
//           <span>{currentLikes}</span>
//         </button>

//         <button onClick={() => setShowComments(true)} className="flex gap-2">
//           <TbMessageCircle className="text-xl" />
//           <span>{commentsList.length}</span>
//         </button>

//         <button className="flex gap-2">
//           <FiShare2 className="text-xl" />
//           <span>{shares}</span>
//         </button>

//         <button onClick={() => setIsSaved(!isSaved)} className="flex gap-2">
//           <FaRegBookmark className="text-xl" />
//         </button>
//       </div>

//       {/* COMMENT POPUP */}
//       {showComments && (
//         <div className="fixed inset-0 bg-black/20 backdrop-blur flex justify-center items-center z-50">
//           <div className="bg-white p-4 rounded-lg w-full max-w-md">
//             <button
//               onClick={() => setShowComments(false)}
//               className="float-right text-xl"
//             >
//               ✖
//             </button>

//             <h3 className="text-lg font-semibold mb-4">Comments</h3>

//             <div className="flex mb-4">
//               <input
//                 className="border p-2 flex-1"
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="Add a comment..."
//               />
//               <button
//                 className="bg-blue-500 text-white px-3 py-2 ml-2 rounded"
//                 onClick={() => handleAddComment(id)}
//               >
//                 Post
//               </button>
//             </div>

//             {commentsList && commentsList.length > 0 ? (
//               commentsList
//                 .filter((c) => c && c.text) // safely filter
//                 .map((c, index) => (
//                   <p key={index} className="border-b py-2 text-gray-800">
//                     {c.text}
//                   </p>
//                 ))
//             ) : (
//               <p className="text-gray-500">No comments yet.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;

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
  author,    // 👈 username + avatar
  title,      // 👈 NEW: article title
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

  // LIKE
  const handleLike = () => {
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newComment = response.data.comment || response.data;

      // ⭐ FIX: Add username locally so UI updates instantly
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
    <div className="social-card bg-card rounded-2xl border shadow-md hover:shadow-xl transition-all overflow-hidden">

      {/* ------------ HEADER ------------ */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={author?.avatar ? author.avatar : "/default-avatar.png"}
            className="w-10 h-10 rounded-full"
            alt="profile"
          />

          <div>
            <p className="font-semibold">{author?.name || "Unknown User"}</p>
            <p className="text-xs text-gray-500">
              @{author?.name?.toLowerCase() || "unknown"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">
            {dayjs(timestamp).fromNow()}
          </span>
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
      <div className="px-4 py-3 border-t flex justify-around">
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
        <button onClick={() => setShowComments(true)} className="flex gap-2">
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
        <div className="fixed inset-0 bg-black/20 backdrop-blur flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">

            <button
              onClick={() => setShowComments(false)}
              className="float-right text-xl"
            >
              ✖
            </button>

            <h3 className="text-lg font-semibold mb-4">Comments</h3>

            {/* INPUT */}
            <div className="flex mb-4">
              <input
                className="border p-2 flex-1"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button
                className="bg-blue-500 text-white px-3 py-2 ml-2 rounded"
                onClick={() => handleAddComment(id)}
              >
                Post
              </button>
            </div>

            {/* COMMENTS LIST */}
            {commentsList.length > 0 ? (
              commentsList.map((c, index) =>
                c?.text ? (
                  <div key={index} className="border-b py-2">
                    <p className="font-semibold text-sm">
                      {c.user?.username || "Anonymous"}
                    </p>
                    <p>{c.text}</p>
                  </div>
                ) : null
              )
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
