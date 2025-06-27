import { FaCog, FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Header() {
const navigate = useNavigate();

  return (
    <header className="h-16 bg-[#f1f6ff] flex items-center px-8 shadow-sm justify-start gap-6">
  
  
  {/* <div className="flex gap-6">
    <span className="font-bold text-gray-500 text-sm cursor-pointer">INBOX</span>
    <span className="font-bold text-gray-500 text-sm cursor-pointer">FAVOURITE</span>
  </div> */}

 
  {/* <div className="relative bg-white rounded-lg shadow-sm ml-4">
    <input
      type="text"
      placeholder="Search"
      className="pl-6 pr-8 py-2 text-sm rounded-lg outline-none w-64"
    />
    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
  </div> */}

 
  <div className="ml-auto flex items-center gap-6">
    <FaCog onClick={() => navigate("/settings")}  className="text-gray-700 text-base cursor-pointer transition-all duration-200 hover:text-[#7B49FF] hover:scale-110"
/>
    
    <div onClick={() => navigate("/notification")} className="relative">
      <FaBell className="text-gray-700 text-base cursor-pointer transition-all duration-200 hover:text-[#7B49FF] hover:scale-110"/>
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </div>

    <div
      onClick={() => navigate("/admin-profile")}
      className="w-9 h-9 bg-purple-500 rounded-full border-2 border-white cursor-pointer transition-all duration-200 hover:scale-110 hover:bg-purple-600"
    ></div>
  </div>
</header>

  );
}
