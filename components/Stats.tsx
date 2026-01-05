
import React from 'react';

interface StatsProps {
  activeCount: number;
  totalCount: number;
}

export const Stats: React.FC<StatsProps> = ({ activeCount, totalCount }) => {
  const progress = totalCount > 0 ? Math.round(((totalCount - activeCount) / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-600">
          {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-bold text-slate-400">{progress}% done</span>
      </div>
    </div>
  );
};
