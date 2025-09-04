import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/applications", label: "Applications" },
  { to: "/applications/add", label: "Add Application" },
  { to: "/settings", label: "Settings" },
];

const isDark = document.documentElement.classList.contains('dark-mode');

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Sidebar */}
     <aside
      className={`fixed top-0 left-0 w-64 min-h-screen rounded-lg m-3 p-4 flex flex-col gap-4 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      style={{
        background: isDark
          ? "linear-gradient(180deg, #010a13ff, #111116ff, #010a13ff)" // dark mode gradient
          : "linear-gradient(180deg, rgba(10, 10, 10, 0.7), rgba(9, 10, 10, 0.82), rgba(8, 7, 7, 0.93))", // light mode glassy
        backdropFilter: !isDark ? "blur(10px)" : "none",
        WebkitBackdropFilter: !isDark ? "blur(10px)" : "none",
      }}
    >
        {/* Logo/Header */}
        <div
          className="p-4 text-lg font-bold text-gray-800 dark:text-gray-100 rounded-lg  dark:bg-gray-800 shadow-sm"
          style={{
            background:
              "linear-gradient(180deg, #e7e710ff, #f3e671ff, #b8a609ff)",
          }}
        >
          <NavLink to={"/applications"} className="text-decoration-none">
            AutoApply
          </NavLink>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className="block px-4 py-3 rounded-lg font-medium text-md text-decoration-none transition-all duration-200 shadow-sm"
              style={({ isActive }) =>
                isActive
                  ? { backgroundColor: "#4F46E5", color: "#fff" } // Indigo for active
                  : {
                      background:
                        "linear-gradient(135deg, rgba(0,168,150,0.7), rgba(32, 222, 165, 0.9), rgba(142, 235, 192, 0.95))",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      color: "#fff", // text always white
                    }
              }
              onClick={onClose} // closes sidebar on mobile
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Dark overlay (only mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
