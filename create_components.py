import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

components_dir = 'frontend/src/components/ui'

components = {
    'GlassCard.jsx': '''import React from 'react';

export const GlassCard = ({ children, className = '', hoverEffect = false, ...props }) => {
  return (
    <div 
      className={`bg-[#10172A]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-lg 
      ${hoverEffect ? 'hover:border-cyan-400/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 transform hover:-translate-y-1' : ''} 
      ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
''',
    
    'GradientButton.jsx': '''import React from 'react';

export const GradientButton = ({ children, className = '', variant = 'primary', ...props }) => {
  const gradients = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.4)]',
    secondary: 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]',
    outline: 'bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]',
  };

  return (
    <button 
      className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${gradients[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
''',

    'StatusBadge.jsx': '''import React from 'react';

export const StatusBadge = ({ status, className = '' }) => {
  const styles = {
    critical: 'bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    success: 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]',
    investigating: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    resolved: 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]',
  };

  const style = styles[status.toLowerCase()] || styles.info;

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${style} ${className}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
''',

    'IncidentSeverityBadge.jsx': '''import React from 'react';

export const IncidentSeverityBadge = ({ severity, className = '' }) => {
  const styles = {
    high: 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]',
    medium: 'bg-orange-500/20 text-orange-400 border border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.3)]',
    low: 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]',
  };
  
  const style = styles[severity.toLowerCase()] || styles.low;

  return (
    <span className={`px-2.5 py-0.5 text-xs font-bold rounded uppercase tracking-wider ${style} ${className}`}>
      {severity}
    </span>
  );
};
''',

    'MetricCard.jsx': '''import React from 'react';
import { GlassCard } from './GlassCard';

export const MetricCard = ({ title, value, icon: Icon, trend, trendLabel, color = 'cyan' }) => {
  const colorStyles = {
    cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    violet: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    red: 'text-red-400 bg-red-400/10 border-red-400/20',
  };

  const currentStyle = colorStyles[color];

  return (
    <GlassCard hoverEffect className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          {trend && (
            <div className="mt-2 flex items-center text-xs">
              <span className={trend > 0 ? 'text-emerald-400' : 'text-red-400'}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              <span className="text-slate-500 ml-2">{trendLabel}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg border ${currentStyle}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </GlassCard>
  );
};
''',

    'PageHeader.jsx': '''import React from 'react';

export const PageHeader = ({ title, description, actions }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          {title}
        </h1>
        {description && <p className="text-slate-400 mt-1">{description}</p>}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
''',

    'HealthIndicator.jsx': '''import React from 'react';

export const HealthIndicator = ({ status = 'healthy' }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10172A] border border-white/10">
      <div className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
      </div>
      <span className="text-xs font-medium text-emerald-400">System Nominal</span>
    </div>
  );
};
''',

    'TopNavbar.jsx': '''import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { HealthIndicator } from './HealthIndicator';

export const TopNavbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 border-b border-white/5 bg-[#0B1020]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button onClick={onMenuClick} className="lg:hidden text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div className="hidden sm:flex items-center bg-[#10172A] border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.1)] transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search incidents, runbooks..." 
            className="bg-transparent border-none outline-none text-sm text-slate-200 ml-2 w-64 placeholder-slate-500"
          />
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-slate-400 border border-white/10">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-slate-400 border border-white/10">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <HealthIndicator />
        <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
        <button className="relative text-slate-400 hover:text-cyan-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border-2 border-[#0B1020]"></span>
          </span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-[0_0_10px_rgba(139,92,246,0.3)]">
            OP
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-200 leading-none">Operations Engineer</p>
            <p className="text-xs text-slate-500 mt-1">Production Env</p>
          </div>
        </div>
      </div>
    </header>
  );
};
''',

    'Sidebar.jsx': '''import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  BrainCircuit,
  BookOpen,
  FileText,
  LineChart,
  Settings,
  Database
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

  const sidebarClasses = `fixed inset-y-0 left-0 z-40 w-64 bg-[#050816]/95 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${
    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
  }`;

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden" onClick={closeMobile}></div>
      )}
      <aside className={sidebarClasses}>
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <BrainCircuit className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Nexus AI
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Command Center</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                  )}
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <div className="bg-[#10172A] border border-white/10 rounded-lg p-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-[#10172A]"></span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">AI Engine</p>
                <p className="text-[10px] text-emerald-400 font-medium tracking-wide">ONLINE & ACTIVE</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
''',

    'LoadingSkeleton.jsx': '''import React from 'react';
import { GlassCard } from './GlassCard';

export const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
  if (type === 'table') {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5">
            <div className="h-4 w-12 bg-white/5 rounded animate-pulse"></div>
            <div className="h-4 w-1/4 bg-white/5 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-white/5 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-white/5 rounded animate-pulse"></div>
            <div className="h-4 w-1/3 bg-white/5 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <GlassCard key={i} className="p-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/5 animate-pulse"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse"></div>
              <div className="h-3 w-full bg-white/5 rounded animate-pulse"></div>
              <div className="h-3 w-3/4 bg-white/5 rounded animate-pulse"></div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};
'''
}

for filename, content in components.items():
    write_file(os.path.join(components_dir, filename), content)

print("Created components")
