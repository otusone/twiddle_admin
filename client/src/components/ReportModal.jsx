import React from "react";

export default function ReportModal({ report, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Report Details</h2>
        <p><strong>Reported User:</strong> {report.reportedUser}</p>
        <p><strong>Email:</strong> {report.email}</p>
        <p><strong>Reason:</strong> {report.reason}</p>
        <p><strong>Details:</strong> {report.details}</p>
        <div className="text-right mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
