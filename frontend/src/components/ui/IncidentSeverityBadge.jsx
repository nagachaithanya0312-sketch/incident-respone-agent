import React from 'react';

export const IncidentSeverityBadge = ({ severity, className = '' }) => {
  const styles = {
    critical: 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse',
    high: 'bg-orange-500/20 text-orange-400 border border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.3)]',
    medium: 'bg-amber-500/20 text-amber-400 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]',
    low: 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]',
  };
  
  const style = styles[severity.toLowerCase()] || styles.low;

  return (
    <span className={`px-2.5 py-0.5 text-xs font-bold rounded uppercase tracking-wider ${style} ${className}`}>
      {severity}
    </span>
  );
};
