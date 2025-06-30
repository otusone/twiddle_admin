import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UsersList";
import './index.css';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import UserProfile from './pages/UserProfile';
import Dating from './pages/Dating';
import NotDating from './pages/NotDating';
import CommonUsers from './pages/CommonUsers';
import ManageFeed from './pages/ManageFeed';
import Settings from './pages/Settings';
import Help from './pages/Help';
import AdminProfile from './pages/AdminProfile';
import ContestDashboard from './pages/ContestDashboard/Contest';
import ContestManagement from './pages/ContestDashboard/ContestManagement';
import CreateContestForm from './pages/ContestDashboard/CreateContestForm';
import SubmissionsManagement from './pages/ContestDashboard/SubmissionsManagement';
import Votes from './pages/ContestDashboard/Votes';
import Report from './pages/ContestDashboard/Report';
import Notification from './pages/Notification';
import ContestDetails from './pages/ContestDashboard/ContestDetails';
import Login from './pages/Login';


function LayoutWrapper({ children }) {
  const location = useLocation();

 
  if (location.pathname === "/login") {
    return children;
  }

  return (
    <div className="app-container relative flex">
      <Sidebar />
      <div className="main-content flex-1">
        <Header />
        <main className="dashboard-area overflow-y-auto scrollbar-hide p-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
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
          <Route path="/notification" element={<Notification />} />
          <Route path="/create-contest" element={<ContestDashboard />} />
          <Route path="/contest/contest-management" element={<ContestManagement />} />
          <Route path="/contest/create-contest-form" element={<CreateContestForm />} />
          <Route path="/contest/submissions-management" element={<SubmissionsManagement />} />
          <Route path="/contest/votes" element={<Votes />} />
          <Route path="/contest/reports" element={<Report />} />
          <Route path="/contest/view" element={<ContestDetails />} />
          
        </Routes>
      </LayoutWrapper>
  );
}

export default App;
