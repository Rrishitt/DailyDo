import { useState } from 'react';
import { TaskCreationModal } from '../TaskCreationModal';
import { Button } from '@/components/ui/button';

export default function TaskCreationModalExample() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (task: any) => {
    console.log('Task created:', task);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Button onClick={() => setOpen(true)}>Open Task Creation Modal</Button>
      <TaskCreationModal open={open} onOpenChange={setOpen} onSubmit={handleSubmit} />
    </div>
  );
}
