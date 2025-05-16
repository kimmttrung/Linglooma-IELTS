import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import PageLogin from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';

import LessonSpeaking from './pages/Features/LessonSpeaking';
import SettingsPage from './pages/Settings/Settings';
import ViewResultsPage from './pages/ViewResults/ViewResults';
import Recording from './pages/Features/Recording'
import Skill4 from './pages/Features/Skill4';
import IeltsSpeakingPractice from './pages/Features/Practice';
import PageSubmitRecording from './pages/Features/Practice/PageSubmitRecording';

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
          <Route path="view-results" element={<ViewResultsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="features/practice" element={<IeltsSpeakingPractice />} />
          <Route path="features/recording" element={<Recording />} />
          {/* <Route path="features/submit" element={<PageSubmitRecording />} /> */}
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoutes;
