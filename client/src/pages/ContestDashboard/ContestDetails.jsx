import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Grid,
    Avatar,
    Card,
    CardContent,
    Chip,
} from "@mui/material";
import TableLayout from "../../components/common/TableLayout";


const contestData = {
    id: 1,
    title: "Summer Vibes",
    description: "Capture the essence of summer through your lens!",
    status: "Live",
    startDate: "2025-06-01",
    endDate: "2025-07-01",
    totalEntries: 48,
    winners: [
        {
            rank: 1,
            name: "Alice",
            email: "alice@example.com",
            profile: "/path/to/alice.jpg",
        },
        {
            rank: 2,
            name: "Bob",
            email: "bob@example.com",
            profile: "/path/to/bob.jpg",
        },
        {
            rank: 3,
            name: "Charlie",
            email: "charlie@example.com",
            profile: "/path/to/charlie.jpg",
        },
    ],
    participants: [
        {
            rank: 1,
            name: "Alice",
            email: "alice@example.com",
            profile: "/path/to/alice.jpg",
            reward: "Delivered",
        },
        {
            rank: 2,
            name: "Bob",
            email: "bob@example.com",
            profile: "/path/to/bob.jpg",
            reward: "Delivered",
        },
        {
            rank: 3,
            name: "Charlie",
            email: "charlie@example.com",
            profile: "/path/to/charlie.jpg",
            reward: "Pending",
        },
    ],
};

const headers = ["Rank", "Profile", "Name", "Email", "Reward Status"];



export default function ContestDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    

    const {
        title,
        description,
        status,
        startDate,
        endDate,
        winners,
    } = contestData;
    

    const [participants, setParticipants] = useState(contestData.participants);

    const handleToggleReward = (rank) => {
        const confirmed = window.confirm("Are you sure you want to change the reward status?");
        if (!confirmed) return;

        setParticipants((prev) =>
            prev.map((p) =>
                p.rank === rank
                    ? {
                        ...p,
                        reward: p.reward === "Delivered" ? "Pending" : "Delivered",
                    }
                    : p
            )
        );
    };
    const renderRow = (user) => (
    <tr key={user.rank} className="border-b hover:bg-gray-50">
        <td className="py-3 px-4">{user.rank}</td>
        <td className="py-3 px-4 flex justify-center">
            <Avatar src={user.profile} alt={user.name} />
        </td>
        <td className="py-3 px-4">{user.name}</td>
        <td className="py-3 px-4">{user.email}</td>
        <td className="py-3 px-4">
            <Chip
                label={user.reward}
                color={user.reward === "Delivered" ? "success" : "warning"}
                size="small"
                onClick={() => handleToggleReward(user.rank)}
                sx={{ cursor: "pointer" }}
            />
        </td>
    </tr>
);


    return (
        <Box className="px-6 py-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-400 hover:bg-purple-700 rounded-lg shadow-sm transition duration-150"
            >
                ← Back
            </button>

            <div className="bg-white p-6 rounded-xl shadow">
                <Typography variant="h4" fontWeight="bold" className="mb-2">
                    {title}
                </Typography>
                <Typography variant="subtitle1" className="mb-1 text-gray-600">
                    {description}
                </Typography>
                <Typography variant="body2" className="mb-4 text-gray-500 flex items-center gap-2">
                    Status:
                    <Chip
                        label={status}
                        size="small"
                        sx={{
                            backgroundColor:
                                status === "Live"
                                    ? "#d1fae5"
                                    : status === "Upcoming"
                                        ? "#fef3c7"
                                        : "#e5e7eb",
                            color:
                                status === "Live"
                                    ? "#065f46"
                                    : status === "Upcoming"
                                        ? "#92400e"
                                        : "#374151",
                            fontWeight: 600,
                        }}
                    />
                    | {startDate} → {endDate}
                </Typography>


                <Typography
                    variant="h6"
                    className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7B49FF] to-[#FA457E] mb-6"
                >
                    Top 3 Winners
                </Typography>

                <Grid container spacing={3} mb={5} mt={5} justifyContent="center">
                    {winners.map((winner) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={winner.rank}
                            display="flex"
                            justifyContent="center"
                        >
                            <Card
                                sx={{
                                    width: 180,
                                    textAlign: "center",
                                    py: 1,
                                    background: "linear-gradient(135deg, #FA457E10, #7B49FF10)",
                                    border: "2px solid",
                                    borderImageSlice: 1,
                                    borderImageSource: "linear-gradient(to right, #FA457E, #7B49FF)",
                                    boxShadow: 4,
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: 6,
                                    },
                                }}
                            >

                                <CardContent>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        #{winner.rank}
                                    </Typography>
                                    <Avatar
                                        src={winner.profile}
                                        alt={winner.name}
                                        sx={{
                                            width: 68,
                                            height: 68,
                                            mx: "auto",
                                            my: 1,
                                            border: "3px solid #FA457E",
                                        }}
                                    />
                                    <Typography variant="h6" fontWeight="bold" color="#7B49FF">
                                        {winner.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {winner.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <TableLayout
                    title="All Participants"
                    headers={headers}
                    data={participants}
                    renderRow={renderRow}
                />
            </div>
        </Box>
    );
}
