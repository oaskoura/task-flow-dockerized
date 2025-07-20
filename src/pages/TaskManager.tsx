import { useState } from 'react';
import { Plus, LayoutDashboard } from 'lucide-react';
import { Task } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from '@/components/TaskCard';
import { TaskForm } from '@/components/TaskForm';
import { TaskStats } from '@/components/TaskStats';
import { TaskFilters } from '@/components/TaskFilters';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function TaskManager() {
  const {
    tasks,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats,
    getCategories,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const { toast } = useToast();

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    createTask(taskData);
    toast({
      title: "Task created",
      description: "Your task has been created successfully.",
    });
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(undefined);
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully.",
      variant: "destructive",
    });
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    updateTask(id, { status });
    toast({
      title: "Status updated",
      description: `Task status changed to ${status}.`,
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const stats = getTaskStats();
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Task Manager
                </h1>
                <p className="text-sm text-muted-foreground">
                  Organize your work and boost productivity
                </p>
              </div>
            </div>
            
            <Button onClick={() => setIsFormOpen(true)} className="shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <TaskStats stats={stats} />

        {/* Filters */}
        <TaskFilters 
          filters={filters} 
          onFiltersChange={setFilters}
          categories={categories}
        />

        {/* Tasks Grid */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <LayoutDashboard className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                {Object.keys(filters).length > 0 
                  ? "Try adjusting your filters or create a new task."
                  : "Get started by creating your first task."
                }
              </p>
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Task
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Task Form Modal */}
      <TaskForm
        task={editingTask}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        categories={categories}
      />
    </div>
  );
}