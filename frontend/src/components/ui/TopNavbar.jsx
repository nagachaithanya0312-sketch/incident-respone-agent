import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { HealthIndicator } from './HealthIndicator';

export const TopNavbar = ({ onMenuClick }) => {
  return (
    <header className="h-20 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4 w-full max-w-md">
        {onMenuClick && (
          <button onClick={onMenuClick} className="lg:hidden text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div className="hidden sm:flex items-center bg-[#0B1120] border border-white/10 rounded-xl px-4 py-2.5 w-full focus-within:border-cyan-500/50 focus-within:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all">
          <Search className="w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search OpsMind AI..." 
            className="bg-transparent border-none outline-none text-sm font-medium text-slate-200 ml-3 w-full placeholder-slate-600"
          />
          <div className="flex items-center gap-1 ml-auto">
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-slate-500 font-bold border border-white/10 tracking-widest">⌘K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <HealthIndicator />
        <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
        <button className="relative text-slate-400 hover:text-cyan-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border-2 border-[#030712]"></span>
          </span>
        </button>
        <div className="flex items-center gap-3 bg-[#0B1120] p-1.5 pr-4 rounded-full border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            OP
          </div>
          <div className="hidden md:block">
            <p className="text-[11px] font-bold tracking-wider text-slate-200 uppercase">Operator</p>
            <p className="text-[9px] text-emerald-400 uppercase tracking-widest font-black">Production</p>
          </div>
        </div>
      </div>
    </header>
  );
};
