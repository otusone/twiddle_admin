import React from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    label: "Total Contests",
    value: 20,
    gradient: "bg-gradient-to-br from-orange-500 to-orange-400",
    iconBg: "bg-orange-700 bg-opacity-50"
  },

  {
    label: "Active Entries",
    value: 85,
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-500",
    iconBg: "bg-indigo-800 bg-opacity-50",
  },

  {
    label: "Reported Contestants",
    value: 4,
    gradient: "bg-gradient-to-br from-cyan-400 to-blue-500",
    iconBg: "bg-cyan-800 bg-opacity-50",
  },

  {
    label: "Ending Soon",
    value: 2,
    gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
    iconBg: "bg-emerald-800 bg-opacity-50",
  },
];

const activities = [
  "Jane submitted a new video entry.",
  "Mike reported a contestant.",
  "A new contest was created.",
  "Emily voted in the Summer Vibes contest.",
];

const ContestDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4  pb-36">
      <h1 className="text-2xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-tr from-[#FA457E] to-[#7B49FF]">
        Contest Dashboard
      </h1>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5 font-sans mb-4">
        {stats.map((card, i) => (
          <div
            key={i}
            className={`relative flex justify-between items-center rounded-2xl px-6 py-8 text-white shadow-xl overflow-hidden ${card.gradient}`}
          >

            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[length:30px_30px]"></div>


            <div className="relative z-10">
              <h3 className="text-sm font-semibold mb-1">{card.label}</h3>
              <h2 className="text-3xl font-bold mb-1">{card.value}</h2>
              {/* <p className="text-xs text-white text-opacity-80">{card.note}</p> */}
            </div>


            <div className={`relative z-10 flex items-center justify-center ${card.iconBg} w-16 h-20 rounded-xl`}>
              <div
                className="w-6 h-6 rounded-md"
                style={{
                  WebkitMaskImage:
                    "url('https://img.icons8.com/ios-filled/50/ffffff/image.png')",
                  WebkitMaskSize: "60%",
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  maskImage:
                    "url('https://img.icons8.com/ios-filled/50/ffffff/image.png')",
                  maskSize: "60%",
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

     
      <div className="bg-white p-6 shadow-lg rounded-xl mb-6 mx-5">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>

        <ul className="relative border-l border-gray-300 pl-4 space-y-5 max-h-60 overflow-y-auto pr-2">
          {activities.map((item, i) => (
            <li key={i} className="relative group">
             
              <span className="absolute -left-2 top-1.5 w-3 h-3 bg-gradient-to-r from-[#FA457E] to-[#7B49FF] rounded-full shadow-md"></span>

            
              <div className="bg-gray-50 group-hover:bg-gray-100 rounded-md px-4 py-2 transition duration-200 shadow-sm">
                <p className="text-sm text-gray-700">{item}</p>
                <span className="block text-xs text-gray-400 mt-1">Just now</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed bottom-12 min-w-[77vw] bg-blue-100 shadow-md border-t border-gray-200 z-50 p-3 flex flex-wrap gap-4 mx-4">
        <button onClick={() => navigate("/contest/submissions-management")} className="bg-gradient-to-r from-[#FA457E] to-[#7B49FF] text-white py-2 px-3 rounded-lg hover:shadow-md">
          Submissions Management
        </button>
        <button onClick={() => navigate("/contest/votes")} className="bg-gradient-to-r from-[#FA457E] to-[#7B49FF] text-white py-2 px-3  rounded-lg hover:shadow-md">
          Votes
        </button>
        <button onClick={() => navigate("/contest/reports")} className="bg-gradient-to-r from-[#FA457E] to-[#7B49FF] text-white py-2 px-3  rounded-lg hover:shadow-md">
          Reports
        </button>
        <button onClick={() => navigate("/contest/contest-management")} className="bg-gradient-to-r from-[#FA457E] to-[#7B49FF] text-white py-2 px-3  rounded-lg hover:shadow-md">
          Manage Contests
        </button>
      </div>
    </div>
  );
};

export default ContestDashboard;
