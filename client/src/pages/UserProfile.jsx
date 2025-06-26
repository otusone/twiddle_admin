import React from 'react';
import { FaMapMarkerAlt, FaVenusMars, FaSearch, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import profile from '../assets/profile.png';

const UserProfile = ({ user }) => {
  const hasImage = user?.photo;
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FA457E] to-[#7B49FF] mb-8">
        User Profile
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">

        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-full lg:w-1/3">
          {hasImage ? (
            <img
              src={user.photo}
              alt="Profile"
              className="w-50 h-50 object-cover mb-4 border rounded-md"
            />
          ) : (
            <img
              src={profile}
              alt="Default Profile"
              className="w-50 h-50 object-cover mb-4 border rounded-md" 
            />
            // <FaUserCircle className="w-32 h-32 text-gray-300 mx-auto mb-4 " />
          )}
          <div className="text-left space-y-2 mt-8 mb-8">
            <div className="flex items-center gap-2">
              <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                Basic
              </span>
              <h2 className="text-lg font-semibold text-gray-900">Jane_125</h2>
              <span className="w-3 h-3 bg-green-500 rounded-full ml-auto"></span>
            </div>

            <div className="flex items-center text-sm text-gray-700">
              <FaMapMarkerAlt className="mr-2 text-pink-500" />
              Jaipur, India
            </div>

            <div className="flex items-center text-sm text-gray-700">
              <FaVenusMars className="mr-2 text-pink-500" />
              Female
            </div>

            <div className="flex items-center text-sm text-gray-700">
              <FaSearch className="mr-2 text-pink-500" />
              Seeking: Female
            </div>

            <div className="flex items-center text-sm text-gray-700">
              <FaCalendarAlt className="mr-2 text-pink-500" />
              28-07-2002
            </div>
          </div>


          <button
            className="w-full mt-6 bg-gradient-to-r from-[#FA457E] to-[#7B49FF] text-white py-2 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:brightness-110"
          >
            Edit Profile
          </button>

        </div>


        <div className="w-full lg:w-2/3">
          <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-6">Details</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                'Background',
                'Personality',
                'Appearance',
                'Language',
                'Hobbies',
              ].map((tab, i) => (
                <button
                  key={i}
                  className={`px-4 py-1 rounded-full font-medium transition duration-300 ${i === 0
                    ? 'bg-gradient-to-r from-[#FA457E] to-[#7B49FF] text-white hover:brightness-110 hover:shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-[#FA457E] hover:to-[#7B49FF] hover:text-white'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>


            <table className="w-full text-sm text-gray-700">
              <tbody>
                {[
                  ['Username', 'Jane_125'],
                  ['Full Name', 'Jane Austin'],
                  ['Email', 'jane@gmail.com'],
                  ['Phone No.', '+91 56789 89302'],
                  ['Date Of Birth', '28 July 2002'],
                  ['Age', '23'],
                  ['Gender', 'Female'],
                  ['Nationality', 'Indian'],
                ].map(([label, value], i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 font-medium">{label}</td>
                    <td className="py-3 text-right">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-8">I'm looking for</h2>
            <div className="flex gap-4 mb-8">
              <div>Gender Preferred: </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked
                  className="h-5 w-5 rounded-md accent-[#FA457E]"
                />
                <span className="text-sm font-medium text-gray-800">Man</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox"
                  className="h-5 w-5 rounded-md accent-[#FA457E]"
                />
                <span className="text-sm font-medium text-gray-800">Women</span>
              </label>
            </div>
            <div className="flex gap-4 flex-wrap">
              <div>Age: </div>
              {['18-20', '21-25', '26-30', '31-35'].map((range, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded-md accent-[#FA457E]" defaultChecked={i === 1} />
                  <span>{range}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
