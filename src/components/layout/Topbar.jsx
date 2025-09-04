import React from "react";
import ManualThemeToggle from "./ManualThemeToggle";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  return (
    <header
      className="flex items-center justify-between mx-2 my-0 px-6 py-4 border-b border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 md:ml-64"
      style={{
        borderRadius: "20px",
        background: "linear-gradient(200deg, #e64343ff, #e04e4eff, #DC2626)", // deeper red gradient
      }}
    >
      {/* Left section with hamburger + title */}
      <div className="flex items-center gap-3">
        {/* Show hamburger only on mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-red-200/30 dark:hover:bg-gray-700"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        <div className="flex flex-col leading-tight">
          <NavLink
            to="/"
            className="text-2xl font-bold text-white tracking-wide hover:opacity-90 transition text-decoration-none"
          >
            Job Tracker
          </NavLink>
          <span className="text-sm text-gray-100/90">
            Stay on top of your applications 🚀
          </span>
        </div>
      </div>

      {/* Right side (theme toggle) */}
      <div className="flex items-center gap-4">
        <ManualThemeToggle />
      </div>
    </header>
  );
};

export default Topbar;




