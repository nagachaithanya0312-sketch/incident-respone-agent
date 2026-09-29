import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  BrainCircuit,
  BookOpen,
  FileText,
  LineChart,
  Settings,
  Database,
  Shield
} from 'lucide-react';

export const Sidebar = ({ isMobileOpen, closeMobile }) => {
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/incidents', icon: AlertTriangle, label: 'Incidents' },
    { to: '/memory', icon: Database, label: 'Incident Memory' },
    { to: '/runbooks', icon: BookOpen, label: 'Runbooks' },
    { to: '/ai-analysis', icon: BrainCircuit, label: 'AI Analysis' },
    { to: '/postmortems', icon: FileText, label: 'Post-mortems' },
    { to: '/analytics', icon: LineChart, label: 'Analytics' },
    { to: '/settings', icon: Settings, label: 'Settings' }
  ];

  const sidebarClasses = `fixed inset-y-0 left-0 z-40 w-64 bg-[#0B1120]/95 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${
    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
  }`;

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden" onClick={closeMobile}></div>
      )}
      <aside className={sidebarClasses}>
        <div className="h-20 flex items-center px-6 border-b border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative p-2 rounded-xl bg-[#030712] border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/20 animate-pulse-glow"></div>
              <Shield className="w-6 h-6 text-cyan-400 absolute opacity-30" />
              <BrainCircuit className="w-5 h-5 text-violet-400 relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                OpsMind <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">AI</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-medium">Incident Intelligence</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Command Center</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'text-white border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10"></div>
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                  )}
                  <item.icon className={`w-5 h-5 relative z-10 transition-all duration-300 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-110'}`} />
                  <span className="font-medium relative z-10 text-sm tracking-wide">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <div className="bg-[#030712]/80 border border-white/5 rounded-xl p-4 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-500/20 transition-colors"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <BrainCircuit className="w-5 h-5 text-cyan-400 group-hover:animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#030712] animate-pulse"></span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200 tracking-wide">AI Core</p>
                <p className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase mt-0.5">Online & Learning</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
