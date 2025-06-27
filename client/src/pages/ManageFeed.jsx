import React from "react";
import TableLayout from "../components/common/TableLayout";

export default function ManageFeed() {
  const users = [
    {
      id: 1,
      username: "john_doe",
      photo: "https://i.pravatar.cc/40?img=1",
      email: "john@example.com",
      phone: "123-456-7890",
      dob: "1990-05-15",
      age: 34,
      gender: "Male",
      blocked: false,
      reels: [
        "https://www.w3schools.com/html/mov_bbb.mp4"
      ],
    },
    {
      id: 2,
      username: "jane_smith",
      photo: "https://i.pravatar.cc/40?img=2",
      email: "jane@example.com",
      phone: "987-654-3210",
      dob: "1995-07-22",
      age: 29,
      gender: "Female",
      blocked: true,
      reels: [
        "https://www.w3schools.com/html/movie.mp4"
      ],
    },
  ];

  const headers = [
    "Sr. No.",
    "Profile",
    "Username",
    "Email",
    "Phone",
    // "DOB",
    "Age",
    "Gender",
    "Reels",
    "Actions",
  ];

  const renderRow = (user, idx) => (
    <tr key={user.id} className="border-b hover:bg-gray-50">
      <td className="py-2 px-3 whitespace-nowrap">{idx + 1}</td>
      <td className="py-2 px-3 flex justify-center items-center whitespace-nowrap">
        <img
          src={user.photo}
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>
      <td className="py-2 px-3 font-medium whitespace-nowrap">{user.username}</td>
      <td className="py-2 px-3 whitespace-nowrap">{user.email}</td>
      <td className="py-2 px-3 whitespace-nowrap">{user.phone}</td>
      {/* <td className="py-2 px-3 whitespace-nowrap">{user.dob}</td> */}
      <td className="py-2 px-3 whitespace-nowrap">{user.age}</td>
      <td className="py-2 px-3 whitespace-nowrap">{user.gender}</td>
      <td className="py-2 px-3 whitespace-nowrap">
        <div className="flex justify-center gap-2">
          {user.reels.map((reel, i) => (
            <video key={i} width="60" height="40" controls className="rounded">
              <source src={reel} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
          ))}
        </div>
      </td>
      <td className="py-2 px-3 space-x-4 whitespace-nowrap">
        <button className="text-blue-600 hover:underline">View</button>
        {user.blocked ? (
          <button className="text-green-600 hover:underline">Unblock</button>
        ) : (
          <button className="text-red-600 hover:underline">Block</button>
        )}
      </td>
    </tr>
  );

  return (
    <TableLayout
      title="Manage Feed"
      headers={headers}
      data={users}
      renderRow={renderRow}
    />
  );
}
