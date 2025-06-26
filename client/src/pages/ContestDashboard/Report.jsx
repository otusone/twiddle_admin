import React, { useState } from "react";
import TableLayout from "../../components/common/TableLayout";
import ReportModal from "../../components/ReportModal";
import { useNavigate } from "react-router-dom";

export default function ReportManagement() {
    const [reports, setReports] = useState([
        {
            id: 1,
            reportedUser: "john_doe",
            email: "john@example.com",
            reason: "Inappropriate content",
            details: "Posted offensive comments on a public post.",
            reviewed: false,
        },
        {
            id: 2,
            reportedUser: "jane_smith",
            email: "jane@example.com",
            reason: "Spam",
            details: "Sending unsolicited messages to multiple users.",
            reviewed: true,
        },
    ]);

    const [selectedReport, setSelectedReport] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const handleToggleReviewStatus = (id) => {
        setReports((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, reviewed: !r.reviewed } : r
            )
        );
    };

    const handleViewDetails = (report) => {
        setSelectedReport(report);
        setOpenModal(true);
    };

    const headers = [
        "Sr. No.",
        "Reported User",
        "Email",
        "Reason",
        "Details",
        "Status",
        "Actions",
    ];

    const renderRow = (report, idx) => (
        <tr key={report.id} className="border-b hover:bg-gray-50">
            <td className="py-2 px-3">{idx + 1}</td>
            <td className="py-2 px-3 whitespace-nowrap">{report.reportedUser}</td>
            <td className="py-2 px-3 whitespace-nowrap">{report.email}</td>
            <td className="py-2 px-3 whitespace-nowrap">{report.reason}</td>
            <td className="py-2 px-3 max-w-xs truncate whitespace-nowrap">{report.details}</td>
            <td className="py-2 px-3 whitespace-nowrap">
                <button
                    onClick={() => handleToggleReviewStatus(report.id)}
                    className={`px-2 py-1 text-sm rounded ${report.reviewed
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {report.reviewed ? "Reviewed" : "Pending"}
                </button>
            </td>
            <td className="py-2 px-3 whitespace-nowrap">
                <button
                    onClick={() => handleViewDetails(report)}
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
                title="Reported Users"
                headers={headers}
                data={reports}
                renderRow={renderRow}
            />
            {openModal && selectedReport && (
                <ReportModal
                    report={selectedReport}
                    onClose={() => {
                        setSelectedReport(null);
                        setOpenModal(false);
                    }}
                />
            )}
        </div>
    );
}
