import React from "react";

export default function TableLayout({ title, headers, data, renderRow }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-xl overflow-x-auto">
      {title && (
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FA457E] to-[#7B49FF] mb-8">
          {title}
        </h1>
      )}

      <table className="min-w-full text-sm text-center">
        <thead>
          <tr className="text-gray-700 text-base border-b">
            {headers.map((header, idx) => (
              <th key={idx} className="py-4 px-3 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => renderRow(row, idx))}
        </tbody>
      </table>
    </div>
  );
}
