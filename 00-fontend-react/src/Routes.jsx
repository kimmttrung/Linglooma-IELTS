import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home';
import PageLogin from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';
// import Recording from './pages/Features/Recording';
import Skill4 from './pages/Features/Skill4/Skill4';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<PageLogin />} />

        <Route path="/admin" element={<Admin />} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="features" element={<Skill4 />} />
          {/* <Route path="features" element={<Recording />} /> */}
        </Route>


      </Routes>
    </Router>
  );
};

export default AppRoutes;