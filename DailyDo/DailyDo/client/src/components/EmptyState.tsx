import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

interface EmptyStateProps {
  onCreateTask: () => void;
}

export function EmptyState({ onCreateTask }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 p-6">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
        <Sparkles className="w-16 h-16 text-primary" />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-2xl font-semibold">Your canvas awaits</h3>
        <p className="text-muted-foreground">
          Start building your day by creating your first task. Every great achievement begins with a single step.
        </p>
      </div>

      <Button
        onClick={onCreateTask}
        size="lg"
        className="rounded-full px-8 gap-2"
        data-testid="button-create-first-task"
      >
        <Plus className="w-5 h-5" />
        Create Your First Task
      </Button>
    </div>
  );
}
