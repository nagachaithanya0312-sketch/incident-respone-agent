import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Incidents from './pages/Incidents';
import IncidentDetails from './pages/IncidentDetails';
import IncidentMemory from './pages/IncidentMemory';
import Runbooks from './pages/Runbooks';
import PostMortems from './pages/PostMortems';
import Analytics from './pages/Analytics';
import { GlassCard } from './components/ui/GlassCard';
import { PageHeader } from './components/ui/PageHeader';
import { GradientButton } from './components/ui/GradientButton';

// Generic placeholder component for unimplemented pages
const PlaceholderPage = ({ title }) => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <PageHeader title={title} />
    <GlassCard className="p-12 text-center border border-white/5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 group-hover:opacity-20 transition-opacity"></div>
      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-xl font-medium text-slate-200">System module offline</p>
        <p className="mt-2 text-slate-500">This section of the command center is currently under construction.</p>
        <GradientButton variant="outline" className="mt-6 mx-auto">
          Return to Dashboard
        </GradientButton>
      </div>
    </GlassCard>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="incidents/:id" element={<IncidentDetails />} />
          <Route path="memory" element={<IncidentMemory />} />
          <Route path="runbooks" element={<Runbooks />} />
          <Route path="ai-analysis" element={<PlaceholderPage title="AI Diagnostics" />} />
          <Route path="postmortems" element={<PostMortems />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<PlaceholderPage title="Command Center Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
