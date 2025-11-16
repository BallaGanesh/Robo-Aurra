import { useState } from "react";
import NotificationCard from "./NotificationCard";
import Layout from "../../Layout";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "like",
      user: {
        name: "Sarah Johnson",
        username: "sarahj",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      },
      action: "liked your post",
      postPreview: "Just finished an amazing hiking trip!",
      timestamp: "2 minutes ago",
      isNew: true,
    },
    {
      id: "2",
      type: "comment",
      user: {
        name: "Alex Chen",
        username: "alexchen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      },
      action: "commented on your post",
      postPreview: "That looks amazing! Where was this taken?",
      timestamp: "15 minutes ago",
      isNew: true,
    },
    {
      id: "3",
      type: "follow",
      user: {
        name: "Emma Davis",
        username: "emmadavis",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      },
      action: "started following you",
      timestamp: "1 hour ago",
      isNew: false,
    },
    {
      id: "4",
      type: "mention",
      user: {
        name: "Michael Park",
        username: "mpark",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      },
      action: "mentioned you in a post",
      postPreview: "@you should check out this new feature!",
      timestamp: "3 hours ago",
      isNew: false,
    },
    {
      id: "5",
      type: "share",
      user: {
        name: "Jessica Brown",
        username: "jbrown",
        avatar:
          "https://images.unsplash.com/photo-1500854095635-1f59c0f39a76?w=400&h=400&fit=crop",
      },
      action: "shared your post",
      postPreview: "Coffee and code - the perfect combination",
      timestamp: "5 hours ago",
      isNew: false,
    },
    {
      id: "6",
      type: "like",
      user: {
        name: "David Wilson",
        username: "dwilson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      },
      action: "liked your post",
      postPreview: "Building amazing things with code",
      timestamp: "1 day ago",
      isNew: false,
    },
    {
      id: "7",
      type: "follow",
      user: {
        name: "Lisa Anderson",
        username: "landerson",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      },
      action: "started following you",
      timestamp: "2 days ago",
      isNew: false,
    },
  ]);

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const newNotifications = notifications.filter((n) => n.isNew);
  const oldNotifications = notifications.filter((n) => !n.isNew);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background pb-4 mb-6">
          <h1 className="text-3xl font-bold gradient-text mb-4 bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Notifications
          </h1>
        </div>

        {/* New */}
        {newNotifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-4">New</h2>

            <div className="space-y-3">
              {newNotifications.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  isNew={true}
                  onDelete={deleteNotification}/>
              ))}
            </div>
          </div>
        )}

        {/* Earlier */}
        {oldNotifications.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-4">Earlier</h2>
            <div className="space-y-3">
              {oldNotifications.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  isNew={false}
                  onDelete={deleteNotification}/>
              ))}
            </div>
          </div>
        )}

        {/* Empty */}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              {/* <Heart size={32} className="text-muted-foreground" /> */}
            </div>
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              When people like, comment, or follow you, you'll see it here.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default NotificationsPage;