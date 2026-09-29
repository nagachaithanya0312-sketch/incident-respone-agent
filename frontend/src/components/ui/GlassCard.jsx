import React from 'react';

export const GlassCard = ({ children, className = '', hoverEffect = false, ...props }) => {
  return (
    <div 
      className={`glass-card rounded-xl relative overflow-hidden
      ${hoverEffect ? 'hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-500 transform hover:-translate-y-1' : ''} 
      ${className}`}
      {...props}
    >
      {/* Subtle top glare effect for premium feel */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
};
