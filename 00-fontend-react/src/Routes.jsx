import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import PageLogin from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';
import Skill4 from './pages/Features/Skill4/Skill4';
import LessonSpeaking from './pages/Features/LessonSpeaking/Lesson';
import SettingsPage from './pages/Settings/Settings';
import ViewResultsPage from './pages/ViewResults/ViewResults';
import IeltsSpeakingPractice from './pages/Features/Practice/IeltsSpeakingPractice';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<PageLogin />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="features" element={<Skill4 />} />
          <Route path="features/lesson" element={<LessonSpeaking />} />
          <Route path="features/practice" element={<IeltsSpeakingPractice />} />
          <Route path="view-results" element={<ViewResultsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* <Route path="/view-results" element={<ViewResultsPage />} />
        <Route path="/settings" element={<SettingsPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
