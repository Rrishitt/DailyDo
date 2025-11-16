import { TaskCard } from '../TaskCard';

export default function TaskCardExample() {
  const task = {
    id: '1',
    title: 'Complete project documentation',
    purpose: 'This will help the team understand the architecture and make onboarding easier',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    category: 'Work',
    completed: false,
    breakdown: ['Review existing docs', 'Outline new sections', 'Write and format', 'Get team review'],
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <TaskCard
        {...task}
        onToggle={(id) => console.log('Toggle task:', id)}
        onDelete={(id) => console.log('Delete task:', id)}
        onEdit={(id) => console.log('Edit task:', id)}
      />
    </div>
  );
}
