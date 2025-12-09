import { FiMessageCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
import { VscMention } from "react-icons/vsc";
import { FiShare2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

const NotificationCard = ({ notification, onDelete, onAccept, onReject, isNew }) => {
  const getIcon = (type) => {
    switch (type) {
      case "like":
        return <FaHeart size={20} className="text-purple-600" fill="currentColor" />;
      case "comment":
        return <FiMessageCircle size={20} className="text-blue-500" />;
      case "follow":
        return <FiUserPlus size={20} className="text-blue-500" />;
      case "mention":
        return <VscMention size={20} className="text-purple-600" />;
      case "share":
        return <FiShare2 size={20} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`social-card p-4 ${
        isNew ? "bg-primary/5 border-primary/20" : "hover:bg-muted/30"
      } transition-all`}
    >
      <div className="flex items-start gap-4 bg-indigo-50 p-3 rounded-2xl shadow-md border-2 border-indigo-100 hover:shadow-xl">
        <div className="shrink-0 mt-1">{getIcon(notification.type)}</div>

        <div className="flex-1 min-w-0">
          <img
            src={notification.user.avatar}
            alt={notification.user.name}
            className="w-10 h-10 rounded-full object-cover mb-3"
          />

          <p className="font-semibold text-xl">{notification.user.name}</p>
          <p className="text-sm text-muted-foreground text-gray-500">@{notification.user.username}</p>

          <p className="text-sm mt-2">
            <span className="font-semibold">{notification.action}</span>
          </p>

          {notification.postPreview && (
            <p className="text-sm text-muted-foreground mt-2 italic text-gray-500">
              "{notification.postPreview}"
            </p>
          )}

          <p className="text-xs text-muted-foreground mt-2 text-gray-500">
            {notification.timestamp}
          </p>

          {/* ⭐ ACCEPT & REJECT ONLY FOR FOLLOW REQUESTS */}
          {notification.type === "follow" && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={onAccept}
                className="flex-1 py-2 rounded-full text-white bg-green-600 hover:bg-green-700 font-semibold"
              >
                Accept
              </button>

              <button
                onClick={onReject}
                className="flex-1 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 font-semibold"
              >
                Reject
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => onDelete(notification.id)}
          className="icon-button text-muted-foreground hover:text-foreground text-gray-500 m-1.5 p-2 text-xl hover:rounded-full hover:bg-gray-300 hover:text-black"
        >
          <FiTrash2 className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
