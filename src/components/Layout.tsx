import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div>
      <div className="flex font-[Figtree]">
        {/* fixed sidebar and navbar */}
        <SideBar />
        <Navbar />
        <main className="ml-80 mr-30 mt-16 w-full">
          <Outlet />
          {/* dynamic components render area */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
