import React, { useState } from "react";
import TableLayout from "../components/common/TableLayout";
import EmailModal from "../components/EmailModal";

export default function HelpSupport() {
  const [queries, setQueries] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      subject: "Unable to login",
      message: "I'm not receiving the OTP on my phone.",
      resolved: false,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      subject: "Subscription issue",
      message: "I was charged twice for premium.",
      resolved: true,
    },
  ]);

  const [selectedQuery, setSelectedQuery] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleToggleStatus = (id) => {
    setQueries((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, resolved: !q.resolved } : q
      )
    );
  };

  const handleReply = (query) => {
    setSelectedQuery(query);
    setOpenModal(true);
  };

  const headers = [
    "Sr. No.",
    "User",
    "Email",
    "Subject",
    "Message",
    "Status",
    "Actions",
  ];

  const renderRow = (query, idx) => (
    <tr key={query.id} className="border-b hover:bg-gray-50">
      <td className="py-2 px-3">{idx + 1}</td>
      <td className="py-2 px-3 whitespace-nowrap">{query.name}</td>
      <td className="py-2 px-3 whitespace-nowrap">{query.email}</td>
      <td className="py-2 px-3 whitespace-nowrap">{query.subject}</td>
      <td className="py-2 px-3 whitespace-nowrap max-w-xs truncate">{query.message}</td>
      <td className="py-2 px-3 whitespace-nowrap">
        <button
          onClick={() => handleToggleStatus(query.id)}
          className={`px-2 py-1 text-sm rounded ${
            query.resolved
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {query.resolved ? "Resolved" : "Unresolved"}
        </button>
      </td>
      <td className="py-2 px-3 whitespace-nowrap">
        <button
          onClick={() => handleReply(query)}
          className="text-blue-600 hover:underline"
        >
          Reply
        </button>
      </td>
    </tr>
  );

  return (
    <div>
      <TableLayout
        title="Help & Support Queries"
        headers={headers}
        data={queries}
        renderRow={renderRow}
      />
      {openModal && selectedQuery && (
        <EmailModal
          query={selectedQuery}
          onClose={() => {
            setSelectedQuery(null);
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
}
