import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaUser, FaUsers, FaCog, FaQuestionCircle, FaSignOutAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineForum } from "react-icons/md";
import { RiGroup2Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Sidebar() {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <div className={`font-roboto bg-white shadow-2xl flex flex-col justify-between relative min-h-screen rounded-tr-3xl rounded-br-3xl transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>

            {/* Logo */}
            <div className="px-6 mb-4 py-6 flex flex-col items-start justify-start">
                <img src={logo} alt="logo" className="w-18 h-14 object-contain mb-1" />
                {/* <h4 className={`text-xs font-semibold text-[#C9429D] ${collapsed && "hidden"}`}>Online Dating App</h4> */}
            </div>


            {/* Menu */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className={`flex items-center gap-2 px-6 mb-8 ${collapsed && "hidden"}`}>
                    <h2 className="text-gray-400 text-sm font-medium ">MENU</h2>
                    <div className="w-8 h-px bg-gray-300"></div>
                </div>

                <ul className="space-y-2 px-2">
                    <li
                        onClick={() => navigate("/dashboard")}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 
                        ${location.pathname === "/dashboard"
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"}`}
                    >
                        <MdOutlineForum size={20} />
                        {!collapsed && <span>Dashboard</span>}
                    </li>

                    <li
                        onClick={() => navigate("/users")}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 
                        ${location.pathname === "/users"
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"}`}
                    >
                        <FaUser size={18} />
                        {!collapsed && <span>Users</span>}
                    </li>

                    <li
                        onClick={() => navigate("/dating")}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 
                        ${location.pathname === "/dating"
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"}`}
                    >
                        <FaUsers size={18} />
                        {!collapsed && <span>Dating</span>}
                    </li>

                    <li
                        onClick={() => navigate("/not-for-dating")}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 
                        ${location.pathname === "/not-for-dating"
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"}`}
                    >
                        <RiGroup2Line size={18} />
                        {!collapsed && <span>Not for Dating </span>}
                    </li>

                    <li
                        onClick={() => navigate("/common-users")}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 
                        ${location.pathname === "/common-users"
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"}`}
                    >
                        <RiGroup2Line size={18} />
                        {!collapsed && <span>Common Users</span>}
                    </li>

                    <li
                        onClick={() => navigate("/manage-feed")}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 
                        ${location.pathname === "/manage-feed"
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"}`}
                    >
                        <MdOutlineForum size={20} />
                        {!collapsed && <span>Manage Feeds</span>}
                    </li>

                    <li
                        onClick={() => navigate("/create-contest")}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 
                        ${location.pathname === "/create-contest"
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"}`}
                    >
                        <IoIosAddCircleOutline size={20} />
                        {!collapsed && <span>Create Contest</span>}
                    </li>

                </ul>

                {/* Support */}
                <div className={`flex items-center gap-2 px-6 mt-10 mb-8 ${collapsed && "hidden"}`}>
                    <h2 className="text-gray-400 text-sm font-medium">SUPPORT</h2>
                    <div className="w-8 h-px bg-gray-300"></div>
                </div>
                {/* <h2 className={`text-gray-400 px-6 mt-6 mb-4 text-sm ${collapsed && "hidden"}`}>SUPPORT</h2> */}
                <ul className="space-y-2 px-2">
                    <li
                        onClick={() => navigate("/settings")}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 
                        ${location.pathname === "/settings"
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"}`}
                    >
                        <FaCog size={18} />
                        {!collapsed && <span>Settings</span>}
                    </li>

                    <li
                        onClick={() => navigate("/help")}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 
                        ${location.pathname === "/help"
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"}`}
                    >
                        <FaQuestionCircle size={18} />
                        {!collapsed && <span>Help</span>}
                    </li>

                    
                    <li
                        onClick={() => navigate("/")}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 
                        ${location.pathname === "/"
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"}`}
                    >
                        <FaSignOutAlt size={18} />
                        {!collapsed && <span>Logout</span>}
                    </li>

                </ul>

                {/* Notification */}
                {!collapsed && (
                    <div className="m-4  mt-10 p-4 bg-[#4169e1] rounded-xl text-sm text-white flex flex-col items-center space-y-4">
                        <div className="bg-[#5c85f7] rounded-lg px-3 py-2 text-xs text-white text-center leading-relaxed w-full">
                            I was considering my future as many do at this time of the year.
                        </div>
                        <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-lg text-sm font-medium">
                            Send Push Notification
                        </button>

                    </div>

                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between bg-[#e6efff] px-4 py-3 rounded-bl-3xl shadow-inner">
                <div className="w-10 h-14 bg-purple-500 rounded-xl shadow-lg"></div>
                {!collapsed && (
                    <div className="flex-1 ml-3">
                        <p className="text-xs font-bold text-[#2441a6]">SUPER ADMIN</p>
                        <p className="text-[11px] text-[#367cff]">For any assistance 24/7</p>
                    </div>
                )}
                {!collapsed && (
                    <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-1.5 rounded-xl text-sm shadow">
                        Contact
                    </button>
                )}
            </div>

            {/* Blue Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-32 w-6 h-6 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer"
            >
                {collapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
            </button>
        </div>
    );
}
