import { useState } from "react";

import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";

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
  
  

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  return (
    <div className="social-card bg-card rounded-2xl border border-gray-300 border-border shadow-md hover:shadow-xl transition-all overflow-hidden">
      {/* Post Header */}
      <div className="p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <img
  src={author?.avatar || "/default-avatar.png"}
  alt={author?.name || "User"}
  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-border"
/>

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground text-sm sm:text-base truncate">{author?.name || "Unknown User"}</p>
            <p className=" text-gray-500 text-xs sm:text-sm text-muted-foreground truncate">@{author?.username || "unknown"}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-xs text-gray-500 text-muted-foreground">{timestamp}</span>
          <button className="icon-button text-muted-foreground hover:text-primary p-2 rounded-lg">
            <FiMoreHorizontal className="text-2xl text-gray-500 rounded-full hover:rounded-full hover:bg-gray-200 p-0.5" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <p className="text-foreground leading-relaxed tracking-wide mb-3 text-md sm:text-base">{content}</p>
      </div>

      {/* Action Buttons */}
      <div className="px-2 sm:px-4 py-2 sm:py-3 border-t border-gray-300 border-border flex items-center justify-around gap-1 sm:gap-2">
        <button
            onClick={handleLike}
            className="flex items-center justify-center flex-1">
            <div className=" group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-l sm:text-sm text-gray-500 hover:bg-gray-100 transition-colors">
                <FaRegHeart className="text-xl group-hover:text-red-500" />
                <span className="hidden sm:inline group-hover:text-red-500">{currentLikes}</span>
                <span className="sm:hidden group-hover:text-red-500">{currentLikes}</span>
            </div>
        </button>

        <button className="flex items-center justify-center flex-1">
            <div className=" group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-l sm:text-sm text-gray-500 hover:bg-gray-100 transition-colors">
                <TbMessageCircle className="text-xl group-hover:text-blue-500" />
                <span className="hidden sm:inline group-hover:text-blue-500">{comments}</span>
                <span className="sm:hidden group-hover:text-blue-500">{comments}</span>
            </div>
        </button>

        <button className="flex items-center justify-center flex-1">
            <div className=" group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-l sm:text-sm text-gray-500  hover:bg-gray-100 transition-colors ">
                <FiShare2 className="text-xl group-hover:text-green-500" />
                <span className="hidden sm:inline group-hover:text-green-500">{shares}</span>
                <span className="sm:hidden group-hover:text-green-500">{shares}</span>
            </div>
        </button>

        <button 
            onClick={() => setIsSaved(!isSaved)} 
            className="flex items-center justify-center flex-1">
            <div className=" group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-l sm:text-sm text-gray-500  hover:bg-gray-100 transition-colors ">
                <FaRegBookmark  className="text-xl group-hover:text-amber-500" />
                <span className="hidden sm:inline group-hover:text-amber-500">Save</span>
                {/* <span className="sm:hidden group-hover:text-amber-500">Save</span> */}
            </div>
        </button>
      </div>
    </div>
  );
};

export default PostCard;