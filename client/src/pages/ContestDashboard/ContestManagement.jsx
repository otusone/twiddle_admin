import React, { useState } from "react";
import TableLayout from "../../components/common/TableLayout";
import ContestFormModal from "./CreateContestForm";
import { useNavigate } from "react-router-dom";

const contests = [
  {
    id: 1,
    title: "Summer Vibes",
    status: "Live",
    startDate: "2025-06-01",
    endDate: "2025-07-01",
    totalEntries: 48,
  },
  {
    id: 2,
    title: "Monsoon Moments",
    status: "Upcoming",
    startDate: "2025-07-10",
    endDate: "2025-08-10",
    totalEntries: 0,
  },
  {
    id: 3,
    title: "Spring Love",
    status: "Ended",
    startDate: "2025-04-01",
    endDate: "2025-05-01",
    totalEntries: 93,
  },
];

const headers = [
  "Sr. No.",
  "Contest Name",
  "Status",
  "Start Date",
  "End Date",
  "Total Entries",
  "Actions",
];

const getStatusBadge = (status) => {
  const base = "px-3 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case "Upcoming":
      return <span className={`${base} bg-yellow-100 text-yellow-700`}>{status}</span>;
    case "Live":
      return <span className={`${base} bg-green-100 text-green-700`}>{status}</span>;
    case "Ended":
      return <span className={`${base} bg-gray-200 text-gray-600`}>{status}</span>;
    default:
      return status;
  }
};



export default function ContestManagement() {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    banner: '',
    startDate: '',
    endDate: '',
    enabled: true,
    allowComments: true,
    ageLimit: '',
    gender: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    setFormOpen(false);
  };
  const navigate = useNavigate();

  const renderRow = (contest, idx) => (
  <tr key={contest.id} className="border-b hover:bg-gray-50">
    <td className="py-3 px-4 whitespace-nowrap">{idx + 1}</td>
    <td className="py-3 px-4 font-medium whitespace-nowrap">{contest.title}</td>
    <td className="py-3 px-4 whitespace-nowrap">{getStatusBadge(contest.status)}</td>
    <td className="py-3 px-4 whitespace-nowrap">{contest.startDate}</td>
    <td className="py-3 px-4 whitespace-nowrap">{contest.endDate}</td>
    <td className="py-3 px-4 whitespace-nowrap">{contest.totalEntries}</td>
    <td className="py-3 px-4 space-x-3 whitespace-nowrap">
      <button onClick={() => navigate("/contest/view")}  className="text-blue-600 hover:underline">View</button>
      <button className="text-green-600 hover:underline">Edit</button>
      <button className="text-red-600 hover:underline">Delete</button>
    </td>
  </tr>
);


  return (
    <div className="px-6 py-2">
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FA457E] to-[#7B49FF]">
          Contest Management
        </h1> */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-400 hover:bg-purple-700 rounded-lg shadow-sm transition duration-150"
        >
          ← Back
        </button>
        <button
          onClick={() => setFormOpen(true)}
          className=" mb-4 px-4 py-2 bg-gradient-to-r from-[#FA457E] to-[#7B49FF] text-white px-4 py-2 rounded-lg hover:shadow-md"
        >
          + Create Contest
        </button>
      </div>

      <ContestFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />

      <TableLayout
        title="Contest Management"
        headers={headers}
        data={contests}
        renderRow={renderRow}
      />
    </div>
  );
}
