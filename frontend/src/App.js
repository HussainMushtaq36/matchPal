import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* This makes Register the first thing you see at http://localhost:3000/ */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;