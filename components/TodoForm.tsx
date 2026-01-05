
import React, { useState } from 'react';
import { suggestDescription } from '../services/geminiService';
import { Priority } from '../types';

interface TodoFormProps {
  onAdd: (title: string, description: string, priority: Priority) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim(), priority);
      setTitle('');
      setDescription('');
      setPriority(Priority.MEDIUM);
    }
  };

  const handleAiSuggest = async () => {
    if (!title.trim()) return;
    setIsAiLoading(true);
    const suggestion = await suggestDescription(title);
    setDescription(suggestion);
    setIsAiLoading(false);
  };

  const priorityOptions = [
    { value: Priority.LOW, label: 'Low', color: 'bg-emerald-100 text-emerald-700', active: 'bg-emerald-500 text-white' },
    { value: Priority.MEDIUM, label: 'Medium', color: 'bg-amber-100 text-amber-700', active: 'bg-amber-500 text-white' },
    { value: Priority.HIGH, label: 'High', color: 'bg-rose-100 text-rose-700', active: 'bg-rose-500 text-white' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
            Description <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <button
            type="button"
            onClick={handleAiSuggest}
            disabled={!title || isAiLoading}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 disabled:opacity-50 transition-opacity"
          >
            {isAiLoading ? (
              <span className="flex items-center gap-1">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Thinking...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95l1.135 11.347a1 1 0 01-1.987.199l-1.135-11.347a1 1 0 011.09-.149zM4.474 3.068a1 1 0 011.1-.74l11.347 1.135a1 1 0 01-.199 1.987L5.375 4.315a1 1 0 01-.901-1.247zM1.047 8.7a1 1 0 01.95-.897l11.347 1.135a1 1 0 01-.199 1.987L1.944 9.79a1 1 0 01-.897-.95l.001-.14zM4.315 14.625a1 1 0 011.247-.901l11.347 1.135a1 1 0 01-.199 1.987l-11.347-1.135a1 1 0 01-.901-1.247zM1.047 11.3a1 1 0 01.95-.897l11.347 1.135a1 1 0 01-.199 1.987l-11.347-1.135a1 1 0 01-.901-1.247z" clipRule="evenodd" />
                </svg>
                AI Suggest
              </span>
            )}
          </button>
        </div>
        <textarea
          id="description"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details about this task..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Priority</label>
        <div className="flex gap-2">
          {priorityOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPriority(opt.value)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all border-2 ${
                priority === opt.value
                  ? `${opt.active} border-transparent shadow-sm`
                  : `bg-white text-slate-500 border-slate-100 hover:border-slate-200`
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-100"
      >
        Add Task
      </button>
    </form>
  );
};
