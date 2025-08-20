import React from "react";
import { FaHome, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaMoneyCheckAlt } from "react-icons/fa";

const SideBar:React.FC = () => {
  return (
    <div className="w-64 fixed h-full shadow-2xl">
      <div className="flex h-18 justify-center items-center">
        <img src="./img.jpg" alt="Logo" />
      </div>
      <hr className="text-gray-400" />
      
      <ul className="font-bold">
        {/* Dashboard */}
        <li className="mb-2 rounded hover:shadow">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center w-full py-4 px-3 ${
                isActive
                  ? "bg-[#006666] text-white"
                  : "hover:bg-[#FE6A49] hover:text-white"
              }`
            }
          >
            <FaHome className="w-6 h-6 mr-2 ml-4" />
            Dashboard
          </NavLink>
        </li>

        {/* Customers */}
        <li className="mb-2 rounded hover:shadow">
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `flex items-center w-full py-4 px-3 ${
                isActive
                  ? "bg-[#006666] text-white"
                  : "hover:bg-[#FE6A49] hover:text-white"
              }`
            }
          >
            <FaUsers className="w-6 h-6 mr-2 ml-4" />
            Customers
          </NavLink>
        </li>

        {/* Sales */}
        <li className="mb-2 rounded hover:shadow">
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              `flex items-center w-full py-4 px-3 ${
                isActive
                  ? "bg-[#006666] text-white"
                  : "hover:bg-[#FE6A49] hover:text-white"
              }`
            }
          >
            <FaMoneyCheckAlt className="w-6 h-6 mr-2 ml-4"/>
            Sales
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
