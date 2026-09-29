import React, { useEffect, useState } from 'react';

export const SimilarityRing = ({ percentage, size = 64, strokeWidth = 4 }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    // Small timeout to allow CSS animation to trigger after mount
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  let colorClass = 'text-cyan-400';
  let glowClass = 'shadow-[0_0_10px_rgba(34,211,238,0.5)]';
  if (percentage >= 80) {
    colorClass = 'text-emerald-400';
    glowClass = 'shadow-[0_0_10px_rgba(16,185,129,0.5)]';
  } else if (percentage >= 50) {
    colorClass = 'text-amber-400';
    glowClass = 'shadow-[0_0_10px_rgba(245,158,11,0.5)]';
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background ring */}
        <circle
          className="text-white/10"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress ring */}
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Center text */}
      <span className={`absolute font-bold text-sm ${colorClass}`}>
        {Math.round(animatedPercentage)}%
      </span>
      {/* Subtle glow behind text */}
      <div className={`absolute inset-2 rounded-full blur-md opacity-20 bg-current ${colorClass}`}></div>
    </div>
  );
};
