import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

import { FiHome } from "react-icons/fi";
import { FaRegCompass } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: FiHome },
    { path: "/explore", label: "Explore", icon: FaRegCompass },
    { path: "/messages", label: "Messages", icon: FiMessageCircle },
    { path: "/notifications", label: "Notifications", icon: FaRegHeart },
    { path: "/profile", label: "Profile", icon: FiUser },
    { path: "/settings", label: "Settings", icon: LuSettings },
  ];

  const isActive = (path) => location.pathname === path;
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-background text-foreground ">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-56 border-r border-gray-300 border-border bg-card flex-col sticky top-0 shadow-lg">
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-gray-300 border-border hover:bg-muted/30 transition-colors">
          <Link 
            to="/" 
            className="flex items-center gap-3 group">
            <div className="w-12 h-12  rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
              <img src="/Only logo-aurra.png"/>
            </div>
            <span className="text-3xl font-bold gradient-text hidden lg:inline bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              AURRA
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center text- gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive(path)
                  ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105 "
                  : "text-foreground hover:bg-muted/50 hover:translate-x-1"
              }`}>
              <Icon
                size={24}
                className="transition-transform duration-300 group-hover:scale-125"/>
              <span className="text-base lg:text-lg font-medium hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-300 border-border hover:bg-muted/30 transition-colors">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm group-hover:shadow-lg transition-all">
              U
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold">You</p>
              <p className="text-xs text-muted-foreground">your_username</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="bg-white md:hidden fixed top-0 left-0 right-0 bg-card border-border z-50 flex items-center justify-between p-4 shadow-md ">
        <Link to="/" className=" justify-between w-[60%] flex items-center gap-2">
          <div className="w-10 h-10  rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">
                <img src="/Only logo-aurra.png" alt="" className=" w-"/>
            </span>
          </div>
          <span className="text-3xl font-bold gradient-text bg-linear-to-r  to-purple-600 from-blue-500 w-25 bg-clip-text text-transparent">AURRA</span>
        </Link>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="bg-white md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 shadow-2xl">
        <div className="flex items-center justify-around">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex-1 flex flex-col items-center justify-center py-3 transition-all ${
                isActive(path)
                  ? "text-blue-500 scale-110"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              <Icon size={25} />
              <span className="text-xs font-medium mt-1 truncate">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto md:mt-0 pt-20 md:pt-0 pb-24 md:pb-0 transition-all">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

export default Layout;