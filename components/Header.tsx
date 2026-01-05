
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="mb-10 text-center">
      <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight">ZenTask AI</h1>
      <p className="mt-2 text-slate-500 font-medium">Manage your day with intelligent focus.</p>
    </header>
  );
};
