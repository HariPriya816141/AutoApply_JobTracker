import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main content */}
      <div className="flex-1 md:ml-64 p-4">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="mt-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;


