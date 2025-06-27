import React, { useState } from "react";
import TableLayout from "../components/common/TableLayout"; 

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!title.trim() || !message.trim()) return;

    const newNotification = {
      id: Date.now(),
      title,
      message,
      date: new Date().toLocaleString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setTitle("");
    setMessage("");
  };

  const headers = ["Sr. No.", "Title", "Message", "Date"];

  const renderRow = (notification, idx) => (
    <tr key={notification.id} className="border-b hover:bg-gray-50">
      <td className="py-2 px-3">{idx + 1}</td>
      <td className="py-2 px-3 font-medium">{notification.title}</td>
      <td className="py-2 px-3">{notification.message}</td>
      <td className="py-2 px-3 text-sm text-gray-500">{notification.date}</td>
    </tr>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FA457E] to-[#7B49FF] mb-6">
        Notification Center
      </h1>

      {/* Notification Form */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Create Notification</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FA457E]"
          />
          <textarea
            rows={4}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7B49FF]"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-[#FA457E] to-[#7B49FF] text-white font-semibold px-6 py-2 rounded hover:opacity-90"
          >
            Send Notification
          </button>
        </div>
      </div>

     
      <TableLayout
        title="Sent Notifications"
        headers={headers}
        data={notifications}
        renderRow={renderRow}
      />
    </div>
  );
}
