import { useState } from "react";
import Layout from "../Layout";

import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { AiOutlineSun } from "react-icons/ai";
import { IoMoonOutline } from "react-icons/io5";
import { CgChevronRight } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { GoLock } from "react-icons/go";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

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
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleToggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key],});
  };

  const notificationSettings = [
    {
      id: "emailNotifications",
      label: "Email Notifications",
      description: "Receive email updates about your account",
      type: "toggle",
      icon: <IoMdNotificationsOutline size={20} />,
    },
    {
      id: "pushNotifications",
      label: "Push Notifications",
      description: "Get notified about activity on your posts",
      type: "toggle",
      icon: <IoMdNotificationsOutline size={20} />,
    },
  ];

  const privacySettings = [
    {
      id: "privateAccount",
      label: "Private Account",
      description: "Only approved followers can see your posts",
      type: "toggle",
      icon: <GoLock size={20} />,
    },
    {
      id: "allowMessages",
      label: "Allow Messages",
      description: "Allow anyone to send you direct messages",
      type: "toggle",
      icon: <FiUser size={20} />,
    },
  ];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold w-28 mb-2 bg-linear-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        {/* Theme Section */}
        <div className="social-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <IoMoonOutline size={24} className="text-purple-600" />
              ) : (
                <AiOutlineSun size={24} className="text-blue-500" />
              )}
              <div>
                <h3 className="font-semibold">Appearance</h3>
                <p className="text-sm text-muted-foreground">
                  {isDarkMode ? "Dark" : "Light"} mode
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleTheme}
              className="rounded-full font-semibold bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg px-6">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <p className="text-sm text-muted-foreground">Toggle between light and dark themes for a comfortable viewing experience</p>
        </div>

        {/* Notification Settings */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-3">
            {notificationSettings.map((setting) => (
              <div
                key={setting.id}
                className="social-card p-4 flex items-center justify-between hover:bg-muted/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground">{setting.icon}</div>
                  <div>
                    <p className="font-semibold text-sm">{setting.label}</p>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[setting.id]}
                    onChange={() => handleToggleSetting(setting.id)}
                    className="sr-only peer"/>
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-linear-to-r from-blue-500 to-purple-600" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Privacy & Safety</h2>
          <div className="space-y-3">
            {privacySettings.map((setting) => (
              <div
                key={setting.id}
                className="social-card p-4 flex items-center justify-between hover:bg-muted/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground">{setting.icon}</div>
                  <div>
                    <p className="font-semibold text-sm">{setting.label}</p>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[setting.id]}
                    onChange={() => handleToggleSetting(setting.id)}
                    className="sr-only peer"/>
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-linear-to-r from-blue-500 to-purple-600" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Account</h2>
          <div className="space-y-3">
            <button className="social-card shadow-xl border border-gray-300 rounded-2xl p-4 w-full text-left flex items-center justify-between hover:bg-muted/30 transition-all">
              <div className="flex items-center gap-3">
                <FiUser size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-semibold text-sm">Change Password</p>
                  <p className="text-xs text-muted-foreground">Update your account password</p>
                </div>
              </div>
              <CgChevronRight size={20} className="text-muted-foreground" />
            </button>

            <button className="social-card p-4 w-full text-left flex items-center justify-between hover:bg-muted/30 transition-all">
              <div className="flex items-center gap-3">
                <GoLock size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-semibold text-sm">Download Your Data</p>
                  <p className="text-xs text-muted-foreground">Get a copy of your account data</p>
                </div>
              </div>
              <CgChevronRight size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="mb-8">
          <button
            className="bg-red-500 w-full h-12 rounded-full font-semibold text-lg bg-destructive text-white hover:bg-destructive/90 flex items-center justify-center gap-2"
            onClick={() => {
              alert("You have been logged out");
            }}>
            <FiLogOut size={20} />
            Log Out
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">AURRA v1.0</p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Terms of Service</button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">Privacy Policy</button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">Help Center</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;