import React from 'react';

export const GradientButton = ({ children, className = '', variant = 'primary', ...props }) => {
  const gradients = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] border border-cyan-400/20',
    secondary: 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] border border-violet-400/20',
    outline: 'bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]',
  };

  return (
    <button 
      className={`px-5 py-2.5 rounded-lg font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 active:translate-y-0 ${gradients[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
