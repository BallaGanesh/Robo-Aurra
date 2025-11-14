import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const CreatePostModal = ({ isOpen, onClose, onPost, userAvatar, userName }) => {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public");

  const handlePost = () => {
    if (content.trim()) {
      onPost(content, visibility);
      setContent("");
      setVisibility("public");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="
          bg-white flex flex-col shadow-2xl rounded-2xl 
          w-full max-w-lg sm:max-w-xl md:max-w-2xl 
          max-h-[90vh] overflow-y-auto animate-scale-in
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl sm:text-2xl font-bold">Create a Post</h2>
          <button
            onClick={onClose}
            className="icon-button text-muted-foreground hover:text-foreground"
          >
            <IoMdClose className="size-6 sm:size-8 text-gray-400 p-1 hover:bg-gray-200 rounded-full hover:text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={userAvatar}
              alt={userName}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-base sm:text-lg">{userName}</p>

              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="
                  bg-gray-200 text-muted-foreground text-sm rounded 
                  px-2 py-1 cursor-pointer border border-gray-300
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
              >
                <option value="public">🌐 Public</option>
                <option value="friends">👥 Friends</option>
                <option value="private">🔒 Private</option>
              </select>
            </div>
          </div>

          {/* Text Input */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your article or thoughts..."
            className="
              w-full border-0 text-lg sm:text-xl text-foreground 
              placeholder-muted-foreground resize-none 
              focus:outline-none min-h-32 sm:min-h-40
            "
          />
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-300 flex items-center gap-3">
          <button
            onClick={onClose}
            className="
              text-black px-4 sm:px-6 py-2 rounded-full border border-gray-300 
              text-sm sm:text-base hover:bg-purple-500 hover:text-white
            "
          >
            Cancel
          </button>

          <button
            onClick={handlePost}
            disabled={!content.trim()}
            className="
              flex-1 h-10 sm:h-11 rounded-full font-semibold 
              bg-linear-to-r from-blue-500 to-purple-600 text-white 
              hover:shadow-lg hover:shadow-blue-500/30 
              disabled:opacity-50 disabled:cursor-not-allowed
              text-sm sm:text-base
            "
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
