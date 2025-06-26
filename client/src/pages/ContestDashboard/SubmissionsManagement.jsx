import React from "react";
import TableLayout from "../../components/common/TableLayout";
import { useNavigate } from "react-router-dom"; 

const submissions = [
  {
    id: 1,
    userName: "Alice Johnson",
    userImage: "https://randomuser.me/api/portraits/women/1.jpg",
    submissionDate: "2025-06-15",
    voteCount: 128,
    status: "Approved",
  },
  {
    id: 2,
    userName: "Bob Smith",
    userImage: "https://randomuser.me/api/portraits/men/2.jpg",
    submissionDate: "2025-06-18",
    voteCount: 76,
    status: "Pending",
  },
  {
    id: 3,
    userName: "Charlie Lee",
    userImage: "https://randomuser.me/api/portraits/men/3.jpg",
    submissionDate: "2025-06-10",
    voteCount: 34,
    status: "Rejected",
  },
];

const headers = [
  "Sr. No.",
  "User Image",
  "User Name",
  "Submission Date",
  "Vote Count",
  "Status",
  "Actions",
];

const getStatusBadge = (status) => {
  const base = "px-3 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case "Approved":
      return <span className={`${base} bg-green-100 text-green-700`}>{status}</span>;
    case "Pending":
      return <span className={`${base} bg-yellow-100 text-yellow-700`}>{status}</span>;
    case "Rejected":
      return <span className={`${base} bg-red-100 text-red-700`}>{status}</span>;
    default:
      return status;
  }
};

const renderRow = (submission, idx) => (
  <tr key={submission.id} className="border-b hover:bg-gray-50">
    <td className="py-3 px-4 whitespace-nowrap">{idx + 1}</td>
    <td className="py-3 px-4 whitespace-nowrap flex justify-center ">
      <img
        src={submission.userImage}
        alt={submission.userName}
        className="w-10 h-10 rounded-full object-cover"
      />
    </td>
    <td className="py-3 px-4 whitespace-nowrap">{submission.userName}</td>
    <td className="py-3 px-4 whitespace-nowrap">{submission.submissionDate}</td>
    <td className="py-3 px-4 whitespace-nowrap">{submission.voteCount}</td>
    <td className="py-3 px-4 whitespace-nowrap">{getStatusBadge(submission.status)}</td>
    <td className="py-3 px-4 whitespace-nowrap">
      <button className="text-blue-600 hover:underline">View</button>
    </td>
  </tr>
);

export default function SubmissionManagement() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-2">
      <button
  onClick={() => navigate(-1)}
  className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-400 hover:bg-purple-700 rounded-lg shadow-sm transition duration-150"
>
  ← Back
</button>

      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FA457E] to-[#7B49FF]">
          Submissions Management
        </h1>
      </div> */}

      <TableLayout
        title="Submissions Management"
        headers={headers}
        data={submissions}
        renderRow={renderRow}
      />
    </div>
  );
}
