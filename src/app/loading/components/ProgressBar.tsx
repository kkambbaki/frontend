import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full max-w-[795px] bg-progress-bar-bg rounded-full h-6 overflow-hidden">
      <div
        className="relative h-full bg-gradient-to-r from-progress-bar-left to-progress-bar-right 
                   border-4 border-progress-bar-border rounded-full shadow-md 
                   transition-[width] duration-[1000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{
          width: `${progress}%`,
          boxSizing: 'border-box',
          boxShadow: 'inset 0 -6px 5px rgba(180, 32, 32, 0.25)',
        }}
      >
        <div
          className="absolute top-0.5 right-4 h-1 bg-white/60 rounded-[15px] transition-all duration-500"
          style={{
            width: progress < 15 ? '20px' : '78px',
          }}
        />
        <div className="absolute top-0.5 right-1.5 w-[7px] h-1 bg-white/60 rounded-[15px]" />
      </div>
    </div>
  );
};

export default ProgressBar;
