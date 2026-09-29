import React from 'react';
import { GlassCard } from './GlassCard';

export const MetricCard = ({ title, value, icon: Icon, trend, trendLabel, color = 'cyan' }) => {
  const colorStyles = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]',
    violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    red: 'text-red-400 bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
  };

  const currentStyle = colorStyles[color] || colorStyles.cyan;

  return (
    <GlassCard hoverEffect className="p-5 flex flex-col justify-between group">
      <div className="flex justify-between items-start mb-4">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
        <div className={`p-2 rounded-lg border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${currentStyle}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white tracking-tight font-mono">{value}</h3>
        {trend !== undefined && (
          <div className="mt-2 flex items-center text-xs">
            <span className={`font-semibold ${trend > 0 ? 'text-emerald-400' : trend < 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
            <span className="text-slate-500 ml-2">{trendLabel}</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
};
