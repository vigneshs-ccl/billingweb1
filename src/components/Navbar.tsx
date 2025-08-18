import React from "react";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const Navbar:React.FC = () => {
  return (
    <nav className="px-19 py-3 fixed flex justify-between bg-[#f5f5f5] ml-64 h-18 w-full shadow-sm">
      <div className="flex items-center text-xl">
        <FaBars className="text-black me-4 cursor-pointer" />
      </div>
      <div className="flex items-center gap-x-5">
        <div className="relative md:w-65">
          <span className="relative md:absolute inset-y-0 left-0 flex items-center pl-2">
            <CgProfile className="w-10 h-10" />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
