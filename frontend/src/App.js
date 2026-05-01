import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/userdashboard';
import AdminDashboard from './pages/adminDashboard';

function PlaceholderPage({ title }) {
  return (
    <div
      className="min-h-screen bg-[#f9f9ff] px-3 py-5 text-[#181c23]"
      style={{ maxWidth: '390px', margin: '0 auto', minHeight: '100vh' }}
    >
      <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.2)]">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-[#414755]">This route is now wired and ready for detailed implementation.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/view-profile" element={<PlaceholderPage title="View Profile" />} />
        <Route path="/edit-profile" element={<PlaceholderPage title="Edit Profile" />} />
        <Route path="/preferences" element={<PlaceholderPage title="Preferences" />} />
        <Route path="/search-roommates" element={<PlaceholderPage title="Search Roommates" />} />
        <Route path="/suggested-matches" element={<PlaceholderPage title="Suggested Matches" />} />
        <Route path="/match-requests" element={<PlaceholderPage title="Match Requests" />} />
        <Route path="/messages" element={<PlaceholderPage title="Messages" />} />
        <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
        <Route path="/report-block" element={<PlaceholderPage title="Report / Block" />} />
        <Route path="/admin/user-management" element={<PlaceholderPage title="Admin • User Management" />} />
        <Route path="/admin/reports" element={<PlaceholderPage title="Admin • Reports" />} />
        <Route path="/admin/moderation" element={<PlaceholderPage title="Admin • Moderation" />} />
        <Route path="/admin/profile" element={<PlaceholderPage title="Admin • Profile" />} />
      </Routes>
    </Router>
  );
}

export default App;