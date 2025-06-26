import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaUserShield, FaEdit } from "react-icons/fa";
import profile from '../assets/profile.png';

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    name: "Admin Jane",
    username: "admin_jane",
    email: "admin@twiddle.com",
    phone: "+91 98765 43210",
    role: "Super Admin",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FA457E] to-[#7B49FF] mb-8">
        Admin Profile
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 items-stretch">

        {/* Profile Summary */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-full lg:w-1/3 h-full">
          <img
            src={profile}
            alt="Admin Profile"
            className="w-48 h-48 object-cover mb-4 border rounded-md"
          />
          <h2 className="text-xl font-semibold text-gray-900">{adminData.name}</h2>
          <p className="text-sm text-gray-600 mt-1">{adminData.role}</p>
        </div>

        {/* Profile Details */}
        <div className="w-full lg:w-1/2 h-full">
          <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Account Information</h2>
              {!editing && (
                <button
                  className="text-blue-600 hover:underline flex items-center gap-1"
                  onClick={() => setEditing(true)}
                >
                  <FaEdit /> Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={adminData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                ) : (
                  <p className="text-gray-800">{adminData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="username"
                    value={adminData.username}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                ) : (
                  <p className="text-gray-800">{adminData.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={adminData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                ) : (
                  <p className="text-gray-800">{adminData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="phone"
                    value={adminData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                ) : (
                  <p className="text-gray-800">{adminData.phone}</p>
                )}
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            {editing && (
              <div className="mt-6 flex gap-4">
                <button
                  className="bg-gradient-to-r from-[#FA457E] to-[#7B49FF] text-white px-6 py-2 rounded-full font-semibold hover:brightness-110 hover:shadow"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-200 px-6 py-2 rounded-full font-semibold text-gray-700"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
