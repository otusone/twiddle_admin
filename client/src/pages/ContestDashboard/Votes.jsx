import React, { useState } from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    Card,
    CardContent,
    Avatar,
    Grid,
    Chip
} from '@mui/material';
import TableLayout from '../../components/common/TableLayout';
import { useNavigate } from "react-router-dom"; 

const contests = [
    { id: 1, name: "Summer Vibes" },
    { id: 2, name: "Monsoon Moments" },
];

const winners = [
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
];

const allContestants = [
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
    {
        rank: 4,
        name: "David",
        email: "david@example.com",
        profile: "/path/to/david.jpg",
        reward: "Pending",
    },
];

const headers = [
    "Rank",
    "Profile",
    "Name",
    "Email",
    "Reward Status",
    "Actions"
];

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
            />
        </td>
        <td className="py-3 px-4"></td>
    </tr>
);

export default function VotesPage() {
    const [selectedContest, setSelectedContest] = useState("");
  const navigate = useNavigate();

    return (
        <Box>
            <div className="px-6 py-2">
                <button
  onClick={() => navigate(-1)}
  className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-400 hover:bg-purple-700 rounded-lg shadow-sm transition duration-150"
>
  ← Back
</button>
                {/* <Typography variant="h4" mb={3} fontWeight="bold" color="primary">
        Contest Votes
      </Typography> */}
            <div className=" p-4 bg-white rounded-xl shadow">

                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FA457E] to-[#7B49FF] mb-8">
                    Contest Votes
                </h1>

                <Box mb={4}>
                    <Typography variant="subtitle1">Select Contest</Typography>
                    <Select
                        value={selectedContest}
                        onChange={(e) => setSelectedContest(e.target.value)}
                        displayEmpty
                        fullWidth
                    >
                        <MenuItem value="">Select</MenuItem>
                        {contests.map((contest) => (
                            <MenuItem key={contest.id} value={contest.id}>
                                {contest.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>


                {selectedContest && (
                    <>
                        <Typography
                            variant="h6"
                            className='flex justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7B49FF] to-[#FA457E]'
                        >
                            Top 3 Winners
                        </Typography>

                        <Grid
                            container
                            spacing={3}
                            mb={5}
                            mt={4}
                            justifyContent="center"
                            alignItems="center"
                        >
                            {winners.map((winner) => (
                                <Grid item xs={12} sm={6} md={4} key={winner.rank} display="flex" justifyContent="center">
                                    <Card
                                        sx={{
                                            width: 180,
                                            textAlign: 'center',
                                            py: 1,
                                            //   borderRadius: 3,
                                            background: 'linear-gradient(135deg, #FA457E10, #7B49FF10)',
                                            border: '2px solid',
                                            borderImageSlice: 1,
                                            borderImageSource: 'linear-gradient(to right, #FA457E, #7B49FF)',
                                            boxShadow: 4,
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.03)',
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
                                                    mx: 'auto',
                                                    my: 1,
                                                    border: '3px solid #FA457E',
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
                            title="All Contestants"
                            headers={headers}
                            data={allContestants}
                            renderRow={renderRow}
                        />
                    </>
                )}
            </div>
            </div>
        </Box>

    );
}
