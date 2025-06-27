import React, { useState } from "react";
import TableLayout from "../../components/common/TableLayout";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const initialSubmissions = [
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

export default function SubmissionManagement() {
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [status, setStatus] = useState("");

  const handleView = (submission) => {
    setSelectedSubmission(submission);
    setStatus(submission.status);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedSubmission(null);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      setSubmissions((prev) => prev.filter((s) => s.id !== selectedSubmission.id));
      handleClose();
    }
  };

  const handleSave = () => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === selectedSubmission.id ? { ...s, status } : s
      )
    );
    handleClose();
  };

  const renderRow = (submission, idx) => (
    <tr key={submission.id} className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 whitespace-nowrap">{idx + 1}</td>
      <td className="py-3 px-4 whitespace-nowrap flex justify-center">
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
        <button
          onClick={() => handleView(submission)}
          className="text-blue-600 hover:underline"
        >
          View
        </button>
      </td>
    </tr>
  );

  return (
    <div className="px-6 py-2">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-400 hover:bg-purple-700 rounded-lg shadow-sm transition duration-150"
      >
        ← Back
      </button>

      <TableLayout
        title="Submissions Management"
        headers={[
          "Sr. No.",
          "User Image",
          "User Name",
          "Submission Date",
          "Vote Count",
          "Status",
          "Actions",
        ]}
        data={submissions}
        renderRow={renderRow}
      />

      <Dialog open={openModal} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Submission Details</DialogTitle>
        <DialogContent dividers>
          {selectedSubmission && (
            <div className="space-y-3">
              <img
                src={selectedSubmission.userImage}
                alt={selectedSubmission.userName}
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
              <Typography align="center" fontWeight="bold">
                {selectedSubmission.userName}
              </Typography>
              <Typography align="center" color="text.secondary">
                Submitted on: {selectedSubmission.submissionDate}
              </Typography>
              <Typography align="center">Votes: {selectedSubmission.voteCount}</Typography>
              <div>
                <Typography variant="subtitle2" gutterBottom>Status</Typography>
                <Select
                  fullWidth
                  value={status}
                  onChange={handleStatusChange}
                  size="small"
                >
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className="justify-between px-4 pb-4">
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
          <div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
