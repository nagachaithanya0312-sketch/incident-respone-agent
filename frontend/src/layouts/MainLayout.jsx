import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/ui/Sidebar';
import { TopNavbar } from '../components/ui/TopNavbar';
import { Activity } from 'lucide-react';

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#030712] text-slate-200 overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-50">
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute inset-0 scan-line opacity-30"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] animate-float-medium" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Corner UI */}
      <div className="corner-ui top-4 left-4"><span className="w-1.5 h-1.5 bg-cyan-500/50"></span> OPS / AI CORE</div>
      <div className="corner-ui top-4 right-4 justify-end">SYSTEM ONLINE <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span></div>
      <div className="corner-ui bottom-4 left-4"><Activity className="w-3 h-3 text-cyan-500/50" /> SECURE OPERATIONS</div>
      <div className="corner-ui bottom-4 right-4 justify-end">LIVE MONITORING <span className="text-cyan-500/50">]</span></div>

      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileMenuOpen} closeMobile={() => setIsMobileMenuOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 h-screen overflow-hidden">
        <TopNavbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#030712] opacity-50 h-24 bottom-0 top-auto z-20"></div>
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full min-h-full pb-24 relative z-30">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
