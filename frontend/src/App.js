import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/userdashboard';
import AdminDashboard from './pages/adminDashboard';
import SearchRoomMates from './pages/searchRoomMates';
import SuggestedMatches from './pages/suggestedMatches';
import MatchRequest from './pages/matchRequest';
import ViewProfile from './pages/viewProfile';
import Messages from './pages/messages';
import ChatScreen from './pages/chatScreen';
import Notification from './pages/notification';
import LifePreferences from './pages/lifePreferences';
import EditProfile from './pages/editProfile';
import ReportBlock from './pages/reportBlock';
import ManageStudents from './pages/manage';
import ReportsMonitoring from './pages/reportsMonitoring';
import AdminViewProfile from './pages/adminviewProfile';

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
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/preferences" element={<LifePreferences />} />
        <Route path="/search-roommates" element={<SearchRoomMates />} />
        <Route path="/suggested-matches" element={<SuggestedMatches />} />
        <Route path="/match-requests" element={<MatchRequest />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chat-screen" element={<ChatScreen />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/report-block" element={<ReportBlock />} />
        <Route path="/admin/user-management" element={<ManageStudents />} />
        <Route path="/admin/reports" element={<ReportsMonitoring />} />
        <Route path="/admin/moderation" element={<PlaceholderPage title="Admin • Moderation" />} />
        <Route path="/admin/view-profile/:userId" element={<AdminViewProfile />} />
      </Routes>
    </Router>
  );
}

export default App;