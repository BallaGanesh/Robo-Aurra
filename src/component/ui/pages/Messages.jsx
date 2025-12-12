import { useState } from "react";
import Layout from "../Layout";

import { FaPlus } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { FiMoreVertical } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";

const Messages = () => {
  const [selectedChatId, setSelectedChatId] = useState(null); // mobile-friendly
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const [messages, setMessages] = useState([
    {
      id: "1",
      senderId: "other",
      text: "Hey! How are you doing?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: "2",
      senderId: "self",
      text: "I'm doing great! Just finished a project 🎉",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: "3",
      senderId: "other",
      text: "That's awesome! Tell me more about it",
      timestamp: "10:33 AM",
      isOwn: false,
    },
    {
      id: "4",
      senderId: "self",
      text: "It's a social platform with real-time messaging and notifications",
      timestamp: "10:35 AM",
      isOwn: true,
    },
  ]);

  const [chats, setChats] = useState([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        username: "sarahj",
        isOnline: true,
      },
      lastMessage: "That's awesome! Tell me more about it",
      lastMessageTime: "10:33 AM",
      unread: false,
    },
    {
      id: "2",
      user: {
        name: "Alex Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        username: "alexchen",
        isOnline: true,
      },
      lastMessage: "See you tomorrow!",
      lastMessageTime: "Yesterday",
      unread: true,
    },
    {
      id: "3",
      user: {
        name: "Emma Davis",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        username: "emmadavis",
        isOnline: false,
      },
      lastMessage: "Thanks for the help!",
      lastMessageTime: "2 days ago",
      unread: false,
    },
    {
      id: "4",
      user: {
        name: "Michael Park",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        username: "mpark",
        isOnline: false,
      },
      lastMessage: "Looking forward to it!",
      lastMessageTime: "3 days ago",
      unread: false,
    },
  ]);

  const selectedChat = chats.find((c) => c.id === selectedChatId);

  const filteredChats = chats.filter(
    (chat) =>
      chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        senderId: "self",
        text: messageInput,
        isOwn: true,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-80px)] md:h-screen bg-background overflow-hidden">

        {/* SIDEBAR — SHOW ON DESKTOP OR WHEN NO CHAT SELECTED ON MOBILE */}
        {(selectedChatId === null || window.innerWidth >= 768) && (
          <div className="w-full md:w-80 border-r border-gray-300 border-border flex flex-col bg-card md:block">
            {/* Header */}
            <div className="p-4 border-b border-gray-300">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Messages
              </h1>
              <div className="relative">
                <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-200 text-sm outline-none focus:outline-none focus:ring-0  focus:ring-primary"/>
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`w-full p-4 flex gap-3 border-b border-gray-300 hover:bg-gray-100 text-left ${
                    selectedChatId === chat.id ? "bg-primary/10" : ""
                  }`}>
                  <div className="relative">
                    <img
                      src={chat.user.avatar}
                      className="w-12 h-12 rounded-full"/>
                    {chat.user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="font-semibold truncate">{chat.user.name}</p>
                      <span
                        className={`text-xs ${
                          chat.unread ? "text-primary" : "text-gray-500"
                        }`}>
                        {chat.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>

                  {chat.unread && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CHAT WINDOW */}
        {selectedChat && (
          <div className="flex flex-1 flex-col bg-background">

            {/* HEADER */}
            <div className="p-4 border-b border-gray-300 flex items-center gap-3 bg-card">

              {/* Mobile Back Button */}
              <button
                onClick={() => setSelectedChatId(null)}
                className="md:hidden text-gray-700"
              >
                <FiArrowLeft size={22} />
              </button>

              <div className="relative">
                <img
                  src={selectedChat.user.avatar}
                  className="w-10 h-10 rounded-full"
                />
                {selectedChat.user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-white" />
                )}
              </div>

              <div className="flex-1">
                <p className="font-semibold">{selectedChat.user.name}</p>
                <p className="text-xs text-gray-500">
                  {selectedChat.user.isOnline ? "Active now" : "Offline"}
                </p>
              </div>

              <FiMoreVertical size={20} className="text-gray-600" />
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 relative">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[80%] wrap-break-words whitespace-pre-wrap ${
                      msg.isOwn
                        ? "bg-linear-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.isOwn ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT AREA */}
            <div className="p-4 border-t border-gray-300 bg-card flex items-center gap-3">
              <button className="text-blue-500">
                <FaPlus size={22} />
              </button>

              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Aa"
                className="flex-1 px-4 py-3 rounded-full bg-gray-200 focus:ring-2 focus:ring-primary"/>

              <button
                onClick={handleSendMessage}
                className="rounded-full bg-linear-to-r from-blue-500 to-purple-600 p-3 text-white">
                <FiSend size={22} />
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Messages;


