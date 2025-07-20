import { useState, useEffect } from 'react';
import { Task, TaskFilters, TaskStats } from '@/types/task';

const STORAGE_KEY = 'taskManager_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({});

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Error loading tasks from storage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.category && task.category !== filters.category) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return task.title.toLowerCase().includes(searchLower) ||
               task.description?.toLowerCase().includes(searchLower);
      }
      return true;
    });
  };

  const getTaskStats = (): TaskStats => {
    const now = new Date();
    const overdue = tasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < now && 
      task.status !== 'completed'
    ).length;

    return {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      progress: tasks.filter(t => t.status === 'progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      overdue,
    };
  };

  const getCategories = () => {
    const categories = new Set(tasks.map(task => task.category));
    return Array.from(categories).filter(Boolean);
  };

  return {
    tasks: getFilteredTasks(),
    allTasks: tasks,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats,
    getCategories,
  };
};