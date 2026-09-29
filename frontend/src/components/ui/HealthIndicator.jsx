import React from 'react';

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
