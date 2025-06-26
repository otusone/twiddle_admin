import React, { useState } from "react";

export default function EmailModal({ query, onClose }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    alert(`Mail sent to ${query.email}:\n\n${message}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-2">Reply to {query.name}</h2>
        <p className="text-sm mb-1">Subject: {query.subject}</p>
        <textarea
          rows={6}
          className="w-full border border-gray-300 p-2 rounded mt-2"
          placeholder="Write your response here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
