import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CampaignProvider } from './contexts/CampaignContext';
import { DataProvider } from './contexts/DataContext';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import CampaignPlaybook from './pages/CampaignPlaybook';
import DirectoryManagement from './pages/DirectoryManagement';
import SupporterImport from './pages/SupporterImport';
import SequenceBuilder from './pages/SequenceBuilder';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import EventPlanning from './pages/EventPlanning';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CampaignProvider>
        <DataProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="playbook" element={<CampaignPlaybook />} />
                <Route path="events" element={<EventPlanning />} />
                <Route path="directory" element={<DirectoryManagement />} />
                <Route path="import" element={<SupporterImport />} />
                <Route path="sequences" element={<SequenceBuilder />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </Router>
        </DataProvider>
      </CampaignProvider>
    </AuthProvider>
  );
}

export default App;