import React from 'react';
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
