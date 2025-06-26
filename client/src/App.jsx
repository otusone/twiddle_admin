import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UsersList";
import './index.css';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import UserProfile from './pages/UserProfile';
import Dating from './pages/Dating';
import NotDating from './pages/NotDating';
import CommonUsers from './pages/CommonUsers';
import ManageFeed from './pages/ManageFeed';
import Settings from './pages/Settings';
import Help from './pages/Help';
import AdminProfile from './pages/AdminProfile';






function App() {
  return (
    
      <div className="app-container relative flex">
        <Sidebar />
        <div className="main-content flex-1">
          <Header />
          <main className="dashboard-area overflow-y-auto scrollbar-hide p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/usersProfile" element={<UserProfile />} />
              <Route path="/dating" element={<Dating />} />
              <Route path="/not-for-dating" element={<NotDating />} />
              <Route path="/common-users" element={<CommonUsers />} />
              <Route path="/manage-feed" element={<ManageFeed />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/admin-profile" element={<AdminProfile />} />


            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    
  );
}

export default App;
