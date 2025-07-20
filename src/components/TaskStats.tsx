import { BarChart3, CheckCircle, Circle, Clock, AlertTriangle } from 'lucide-react';
import { TaskStats as TaskStatsType } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export function TaskStats({ stats }: TaskStatsProps) {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: BarChart3,
      className: 'border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10',
    },
    {
      title: 'To Do',
      value: stats.todo,
      icon: Circle,
      className: 'border-[hsl(var(--status-todo))]/20 bg-gradient-to-br from-[hsl(var(--status-todo))]/5 to-[hsl(var(--status-todo))]/10',
    },
    {
      title: 'In Progress',
      value: stats.progress,
      icon: Clock,
      className: 'border-[hsl(var(--status-progress))]/20 bg-gradient-to-br from-[hsl(var(--status-progress))]/5 to-[hsl(var(--status-progress))]/10',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      className: 'border-[hsl(var(--status-completed))]/20 bg-gradient-to-br from-[hsl(var(--status-completed))]/5 to-[hsl(var(--status-completed))]/10',
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: AlertTriangle,
      className: 'border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <Card key={stat.title} className={`hover-glow ${stat.className}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 && (
                `${Math.round((stat.value / stats.total) * 100)}% of total`
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}