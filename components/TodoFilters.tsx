
import React from 'react';
import { FilterStatus } from '../types';

interface TodoFiltersProps {
  current: FilterStatus;
  onSetFilter: (status: FilterStatus) => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({ current, onSetFilter }) => {
  const statuses = [
    { label: 'All', value: FilterStatus.ALL },
    { label: 'Active', value: FilterStatus.ACTIVE },
    { label: 'Completed', value: FilterStatus.COMPLETED },
  ];

  return (
    <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
      {statuses.map(status => (
        <button
          key={status.value}
          onClick={() => onSetFilter(status.value)}
          className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
            current === status.value
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {status.label}
        </button>
      ))}
    </nav>
  );
};
