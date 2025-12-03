// import { useState } from "react";

// import { FiMoreHorizontal } from "react-icons/fi";
// import { FaRegHeart, FaHeart } from "react-icons/fa6";
// import { TbMessageCircle } from "react-icons/tb";
// import { FiShare2 } from "react-icons/fi";
// import { CiBookmark } from "react-icons/ci";
// import { FaRegBookmark } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { toggleLike, addComment } from "../features/articleSlice";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const PostCard = ({
//   id,
//   author,
//   content,
//   timestamp,
//   likes,
//   comments,
//   shares,
// }) => {
//   const [data, setData] = useState({ author });
//   const [isLiked, setIsLiked] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const [currentLikes, setCurrentLikes] = useState(likes);
// const [showComments, setShowComments] = useState(false);
// const [commentText, setCommentText] = useState("");
// const [commentsList, setCommentsList] = useState(comments || []);

//   const dispatch = useDispatch();

//   const handleRemove = () => {
//     setData((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleLike = async () => {
//     // ⭐ Step 1: Optimistic UI update
//     setIsLiked((prev) => {
//       const newLiked = !prev;
//       setCurrentLikes((count) =>
//         newLiked ? count + 1 : Math.max(0, count - 1)
//       );
//       return newLiked;
//     });

//     try {
//       // ⭐ Step 2: Call backend using Redux thunk
//       await dispatch(toggleLike(id)).unwrap();

//       // The reducer will update likeCount and likedBy
//       // If backend returns authoritative data, UI will sync automatically
//     } catch (err) {
//       console.error("Like API failed:", err);

//       // ⭐ Step 3: Rollback optimistic UI if API failed
//       setIsLiked((prev) => {
//         const reverted = !prev;
//         setCurrentLikes((count) =>
//           reverted ? count + 1 : Math.max(0, count - 1)
//         );
//         return reverted;
//       });
//     }
//   };
 

// // handle comment submission
// const handleAddComment = async (postId) => {
//   if (!commentText.trim()) return;

//   try {
//     const token = localStorage.getItem("token");
// console.log("COMMENT SEND:", { content: commentText });

//     const response = await axios.post(
//       `https://robo-1-qqhu.onrender.com/api/articles/${postId}/comment`,
//       { text : commentText },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     // Optimistic update
//     setCommentsList((prev) => [...prev, { text : commentText }]);
//     setCommentText("");
//   } catch (error) {
//     console.error("Comment error:", error);
//   }
// };


//   return (
//     <div className="social-card bg-card rounded-2xl border border-gray-300 border-border shadow-md hover:shadow-xl transition-all overflow-hidden">
//       {/* Post Header */}
//       <div className="p-3 sm:p-4 flex items-center justify-between">
//         <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//           <img
//             src={author?.avatar || "/default-avatar.png"}
//             alt={author?.name || "User"}
//             className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-border"
//           />

//           <div className="min-w-0 flex-1">
//             <p className="font-semibold text-foreground text-sm sm:text-base truncate">
//               {author?.name || "Unknown User"}
//             </p>
//             <p className=" text-gray-500 text-xs sm:text-sm text-muted-foreground truncate">
//               @{author?.name || "unknown"}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-1 sm:gap-2">
//           <span className="text-xs text-gray-500 text-muted-foreground">
//             {timestamp}
//           </span>
//           <button className="icon-button text-muted-foreground hover:text-primary p-2 rounded-lg">
//             <FiMoreHorizontal
//               className="text-2xl text-gray-500 rounded-full hover:rounded-full hover:bg-gray-200 p-0.5"
//               onClick={handleRemove}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Post Content */}
//       <div className="px-3 sm:px-4 pb-3 sm:pb-4">
//         <p className="text-foreground leading-relaxed tracking-wide mb-3 text-md sm:text-base">
//           {content}
//         </p>
//       </div>

//       {/* Action Buttons */}
//       <div className="px-2 sm:px-4 py-2 sm:py-3 border-t border-gray-300 border-border flex items-center justify-around gap-1 sm:gap-2">
//         <button
//           onClick={handleLike}
//           className="flex items-center justify-center flex-1"
//         >
//           <div className=" group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-l sm:text-sm text-gray-500 hover:bg-gray-100 transition-colors">
//             {isLiked ? (
//               <FaHeart className="text-xl text-red-500" />
//             ) : (
//               <FaRegHeart className="text-xl group-hover:text-red-500" />
//             )}
//             <span className="hidden sm:inline group-hover:text-red-500">
//               {currentLikes}
//             </span>
//             <span className="sm:hidden group-hover:text-red-500">
//               {currentLikes}
//             </span>
//           </div>
//         </button>
//         <button
//           onClick={() => setShowComments(true)}
//           className="flex items-center justify-center flex-1"
//         >
//           <div className=" group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-l sm:text-sm text-gray-500 hover:bg-gray-100 transition-colors">
//             <TbMessageCircle className="text-xl group-hover:text-blue-500" />
//             <span className="hidden sm:inline group-hover:text-blue-500">
//               {comments}
//             </span>
//             <span className="sm:hidden group-hover:text-blue-500">
//               {comments}
//             </span>
//           </div>
//         </button>
//         <div className="px-4 pb-3">
//           <div className="flex items-center gap-2"></div>
//         </div>

//         <button className="flex items-center justify-center flex-1">
//           <div className=" group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-l sm:text-sm text-gray-500  hover:bg-gray-100 transition-colors ">
//             <FiShare2 className="text-xl group-hover:text-green-500" />
//             <span className="hidden sm:inline group-hover:text-green-500">
//               {shares}
//             </span>
//             <span className="sm:hidden group-hover:text-green-500">
//               {shares}
//             </span>
//           </div>
//         </button>

//         <button
//           onClick={() => setIsSaved(!isSaved)}
//           className="flex items-center justify-center flex-1"
//         >
//           <div className=" group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-l sm:text-sm text-gray-500  hover:bg-gray-100 transition-colors ">
//             <FaRegBookmark className="text-xl group-hover:text-amber-500" />
//             <span className="hidden sm:inline group-hover:text-amber-500">
//               Save
//             </span>
//             {/* <span className="sm:hidden group-hover:text-amber-500">Save</span> */}
//           </div>
//         </button>
//       </div>
//       {showComments && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white w-full max-w-md p-4 rounded-xl shadow-lg">
//             {/* Close Button */}
//             <button
//               onClick={() => setShowComments(false)}
//               className="text-gray-500 float-right text-xl"
//             >
//               ✖
//             </button>

//             <h3 className="text-lg font-semibold mb-3">Comments</h3>

//             {/* Post content */}
//             <p className="text-sm text-gray-700 mb-4">{content}</p>

//             {/* Input Section */}
//             <div className="flex gap-2 mb-4">
//               <input
//                 type="text"
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="Write a comment..."
//                 className="flex-1 border px-3 py-2 rounded-lg"
//               />

//               <button
//                 onClick={() => handleAddComment(id)}
//                 className="bg-blue-500 text-white px-3 py-2 rounded-lg"
//               >
//                 Post
//               </button>
//             </div>

//             {/* Comments List */}
//             <div className="max-h-48 overflow-y-auto pr-2">
//               {commentsList?.length > 0 ? (
//                 commentsList.map((c, index) => (
//                   <p key={index} className="border-b py-2 text-gray-800">
//                     {c.text}
//                   </p>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No comments yet.</p>
//               )}
//             </div>
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
import { useDispatch } from "react-redux";
import axios from "axios";

const PostCard = ({ id, author, content, timestamp, likes, comments, shares }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  
  // FIX 1 — commentsList must be array
  const [commentsList, setCommentsList] = useState(comments || []);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const dispatch = useDispatch();

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
        `https://robo-1-qqhu.onrender.com/api/articles/${postId}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // FIX 3 — use backend response
      setCommentsList((prev) => [...prev, response.data.comment]);
      setCommentText("");

    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  return (
    // <div className="social-card bg-card rounded-2xl border shadow-md hover:shadow-xl transition-all">
    <div className="social-card bg-card rounded-2xl border border-gray-300 border-border shadow-md hover:shadow-xl transition-all overflow-hidden">

      {/* Post header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={author?.avatar || "/default-avatar.png"} className="w-10 h-10 rounded-full" />

          <div>
            <p className="font-semibold">{author?.name || "Unknown User"}</p>
            <p className="text-xs text-gray-500">@{author?.name || "unknown"}</p>
          </div>
        </div>

        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">{content}</div>

      {/* Actions */}
      {/* <div className="px-4 py-3 border-t flex justify-around"> */}
      <div className="px-2 sm:px-4 py-2 sm:py-3 border-t border-gray-300 border-border flex items-center justify-around gap-1 sm:gap-2">

        {/* LIKE */}
        <button onClick={handleLike}>
          {isLiked ? <FaHeart className="text-red-500 text-xl" /> : <FaRegHeart className="text-xl" />}
          <span>{currentLikes}</span>
        </button>

        {/* COMMENTS */}
        <button onClick={() => setShowComments(true)}>
          <TbMessageCircle className="text-xl" />

          
          <span>
            {Array.isArray(commentsList) ? commentsList.length : commentsList}
          </span>
        </button>

        {/* SHARE */}
        <button>
          <FiShare2 className="text-xl" />
          <span>{shares}</span>
        </button>

        {/* SAVE */}
        <button onClick={() => setIsSaved(!isSaved)}>
          <FaRegBookmark className="text-xl" />
        </button>
      </div>

      {/* COMMENT MODAL */}
      {showComments && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex justify-center items-center z-50">

          <div className="bg-white p-4 rounded-lg w-full max-w-md">

            <button onClick={() => setShowComments(false)} className="float-right text-xl">✖</button>

            <h3 className="text-lg font-semibold mb-4">Comments</h3>

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

            <div>
              {commentsList.length > 0 ? (
                commentsList.map((c) => (
                  <p key={c._id} className="border-b py-2">{c.text}</p>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PostCard;
