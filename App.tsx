
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { TodoFilters } from './components/TodoFilters';
import { Stats } from './components/Stats';
import { Todo, FilterStatus, Priority } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('zentask_todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.ALL);

  useEffect(() => {
    localStorage.setItem('zentask_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description: string, priority: Priority) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      priority,
      createdAt: Date.now()
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    let list = [...todos];
    
    // Apply status filter
    switch (filter) {
      case FilterStatus.ACTIVE:
        list = list.filter(t => !t.completed);
        break;
      case FilterStatus.COMPLETED:
        list = list.filter(t => t.completed);
        break;
    }

    // Sort by priority (High -> Medium -> Low)
    const priorityOrder = { [Priority.HIGH]: 0, [Priority.MEDIUM]: 1, [Priority.LOW]: 2 };
    return list.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [todos, filter]);

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Header />
        
        <main className="space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <TodoForm onAdd={addTodo} />
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <TodoFilters current={filter} onSetFilter={setFilter} />
              <button 
                onClick={clearCompleted}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Clear Completed
              </button>
            </div>

            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              {filteredTodos.length > 0 ? (
                <ul className="divide-y divide-slate-100">
                  {filteredTodos.map(todo => (
                    <TodoItem 
                      key={todo.id} 
                      todo={todo} 
                      onToggle={toggleTodo} 
                      onDelete={deleteTodo} 
                    />
                  ))}
                </ul>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-slate-400 font-medium">No tasks found in this view.</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <Stats activeCount={activeCount} totalCount={todos.length} />
            </div>
          </section>
        </main>
        
        <footer className="mt-8 text-center text-slate-400 text-sm">
          <p>Powered by ZenTask AI • Gemini Intelligence Integrated</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
