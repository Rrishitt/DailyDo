import { useState } from 'react';
import { CelebrationModal } from '../CelebrationModal';
import { Button } from '@/components/ui/button';

export default function CelebrationModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button onClick={() => setOpen(true)}>Trigger Celebration</Button>
      <CelebrationModal
        open={open}
        quote="Success is not final, failure is not fatal: it is the courage to continue that counts."
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
