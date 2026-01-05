
import React from 'react';
import { Todo, Priority } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const getPriorityBadge = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-100">
            High
          </span>
        );
      case Priority.MEDIUM:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100">
            Med
          </span>
        );
      case Priority.LOW:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
            Low
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <li className={`group flex items-start gap-4 p-5 hover:bg-slate-50 transition-colors ${todo.completed ? 'opacity-75' : ''}`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed 
            ? 'bg-indigo-500 border-indigo-500' 
            : 'border-slate-300 hover:border-indigo-400'
        }`}
      >
        {todo.completed && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className={`text-base font-semibold transition-all truncate ${
            todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'
          }`}>
            {todo.title}
          </h3>
          {!todo.completed && getPriorityBadge(todo.priority)}
        </div>
        {todo.description && (
          <p className={`mt-0.5 text-sm transition-all ${
            todo.completed ? 'text-slate-300' : 'text-slate-500'
          }`}>
            {todo.description}
          </p>
        )}
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        title="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
};
