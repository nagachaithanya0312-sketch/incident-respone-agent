import React from 'react';

export const StatusBadge = ({ status, className = '' }) => {
  const styles = {
    critical: 'bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]',
    investigating: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    detected: 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
    mitigating: 'bg-violet-500/10 text-violet-400 border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]',
    resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    closed: 'bg-slate-500/10 text-slate-400 border-slate-500/30 shadow-[0_0_10px_rgba(100,116,139,0.2)]',
  };

  const style = styles[status.toLowerCase()] || styles.info;

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border tracking-wide uppercase ${style} ${className}`}>
      {status}
    </span>
  );
};
