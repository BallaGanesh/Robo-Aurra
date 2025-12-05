import { useState } from "react";
import Layout from "../Layout";

import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { AiOutlineSun } from "react-icons/ai";
import { IoMoonOutline } from "react-icons/io5";
import { CgChevronRight } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { GoLock } from "react-icons/go";
import { useDispatch } from "react-redux";
import { setChildValue } from "../../features/auth/childSlice";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    likeNotifications: true,
    commentNotifications: true,
    followNotifications: true,
    mentionNotifications: true,
    privateAccount: false,
    allowMessages: true,
    showActivity: true,
    allowTagging: true,
  });

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(setChildValue(isDarkMode ? "dark" : "light"));
  };

  const handleToggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const notificationSettings = [
    {
      id: "emailNotifications",
      label: "Email Notifications",
      description: "Receive email updates about your account",
      icon: <IoMdNotificationsOutline className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      id: "pushNotifications",
      label: "Push Notifications",
      description: "Get notified about activity on your posts",
      icon: <IoMdNotificationsOutline className="w-5 h-5 md:w-6 md:h-6" />,
    },
  ];

  const privacySettings = [
    {
      id: "privateAccount",
      label: "Private Account",
      description: "Only approved followers can see your posts",
      icon: <GoLock className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      id: "allowMessages",
      label: "Allow Messages",
      description: "Allow anyone to send you direct messages",
      icon: <FiUser className="w-5 h-5 md:w-6 md:h-6" />,
    },
  ];

  const handleLogout = () => {
    dispatch(setChildValue(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You have been logged out");
    navigate("/Login");
  };

  return (
    <Layout>
      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 py-6 md:py-8">

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold w-fit bg-linear-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text">
            Settings
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Theme Section */}
        <div className="social-card p-4 md:p-6 mb-6 border border-gray-300 rounded-2xl shadow-md hover:shadow-lg">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <AiOutlineSun className="w-6 h-6 text-blue-500" />
              ) : (
                <IoMoonOutline className="w-6 h-6 text-purple-600" />
              )}
              <div>
                <h3 className="font-semibold text-lg md:text-xl">Appearance</h3>
                <p className="text-xs md:text-sm text-gray-500">
                  {isDarkMode ? "Light" : "Dark"} mode
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleTheme}
              className="rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 md:px-6 font-semibold hover:shadow-lg transition"
            >
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </button>
          </div>

          <p className="text-xs md:text-sm text-gray-500">
            Toggle between light and dark themes for a comfortable viewing experience
          </p>
        </div>

        {/* Notification Settings */}
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Notifications</h2>

          <div className="space-y-3">
            {notificationSettings.map((item) => (
              <div
                key={item.id}
                className="social-card p-3 md:p-4 flex items-center justify-between border border-gray-300 rounded-2xl shadow-md hover:bg-gray-100/40 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="text-gray-500">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">{item.label}</p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.id]}
                    onChange={() => handleToggleSetting(item.id)}
                    className="sr-only peer"
                  />
                  <div className="w-10 md:w-11 h-5 md:h-6 bg-muted peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:bg-linear-to-r from-blue-500 to-purple-600 after:content-[''] after:absolute after:h-4 md:after:h-5 after:w-4 md:after:w-5 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 peer-checked:after:translate-x-full transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Safety */}
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Privacy & Safety</h2>

          <div className="space-y-3">
            {privacySettings.map((item) => (
              <div
                key={item.id}
                className="social-card p-3 md:p-4 flex items-center justify-between border border-gray-300 rounded-2xl shadow-md hover:bg-gray-100/40 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="text-gray-500">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">{item.label}</p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.id]}
                    onChange={() => handleToggleSetting(item.id)}
                    className="sr-only peer"
                  />
                  <div className="w-10 md:w-11 h-5 md:h-6 bg-muted peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:bg-linear-to-r from-blue-500 to-purple-600 after:content-[''] after:absolute after:h-4 md:after:h-5 after:w-4 md:after:w-5 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 peer-checked:after:translate-x-full transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Account</h2>

          <div className="space-y-3">
            <button className="social-card p-3 md:p-4 w-full text-left flex items-center justify-between border border-gray-300 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <FiUser className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                <div>
                  <p className="font-semibold text-sm md:text-base">Change Password</p>
                  <p className="text-xs md:text-sm text-gray-500">Update your account password</p>
                </div>
              </div>
              <CgChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
            </button>

            <button className="social-card p-3 md:p-4 w-full text-left flex items-center justify-between border border-gray-300 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <GoLock className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                <div>
                  <p className="font-semibold text-sm md:text-base">Download Your Data</p>
                  <p className="text-xs md:text-sm text-gray-500">Get a copy of your account data</p>
                </div>
              </div>
              <CgChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="mb-8">
          <button
            onClick={handleLogout}
            className="bg-red-500 w-full h-10 md:h-12 rounded-full font-semibold text-lg text-white hover:bg-red-600 flex items-center justify-center gap-2 shadow-md"
          >
            <FiLogOut className="w-5 h-5 md:w-6 md:h-6" />
            Log Out
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-6 border-t border-gray-300">
          <p className="text-xs md:text-sm text-gray-500 mb-2">AURRA v1.0</p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <button>Terms</button>
            <span>•</span>
            <button>Privacy</button>
            <span>•</span>
            <button>Help</button>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Settings;
