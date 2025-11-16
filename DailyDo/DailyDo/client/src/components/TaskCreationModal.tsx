import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";

interface TaskCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (task: {
    title: string;
    purpose: string;
    deadline?: Date;
    category: string;
    breakdown: string[];
    reminderCount: string;
  }) => void;
}

const categories = ["Work", "Personal Growth", "Fitness", "Creative", "Social", "Learning"];

export function TaskCreationModal({ open, onOpenChange, onSubmit }: TaskCreationModalProps) {
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [category, setCategory] = useState("");
  const [breakdown, setBreakdown] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState("");
  const [reminderCount, setReminderCount] = useState("1");

  const handleSubmit = () => {
    onSubmit({
      title,
      purpose,
      deadline,
      category,
      breakdown,
      reminderCount,
    });
    handleReset();
  };

  const handleReset = () => {
    setTitle("");
    setPurpose("");
    setDeadline(undefined);
    setCategory("");
    setBreakdown([]);
    setCurrentStep("");
    setReminderCount("1");
  };

  const addBreakdownStep = () => {
    if (currentStep.trim()) {
      setBreakdown([...breakdown, currentStep.trim()]);
      setCurrentStep("");
    }
  };

  const removeBreakdownStep = (index: number) => {
    setBreakdown(breakdown.filter((_, i) => i !== index));
  };

  const canSubmit = title.trim() && category;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Create a New Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">What do you want to accomplish?</Label>
            <Input
              id="title"
              placeholder="Enter your task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              data-testid="input-task-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-base">Category</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 hover-elevate active-elevate-2"
                  onClick={() => setCategory(cat)}
                  data-testid={`category-${cat.toLowerCase()}`}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-base">Why does this matter to you?</Label>
            <Textarea
              id="purpose"
              placeholder="What will completing this task mean for you?"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="min-h-20"
              data-testid="input-task-purpose"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">Deadline (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  data-testid="button-select-deadline"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-base">How will you do it? (Optional)</Label>
            <div className="space-y-2">
              {breakdown.map((step, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <span className="text-sm text-muted-foreground min-w-6">{index + 1}.</span>
                  <div className="flex-1 p-2 bg-muted/50 rounded-lg">
                    <span className="text-sm">{step}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBreakdownStep(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    data-testid={`button-remove-step-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a step..."
                  value={currentStep}
                  onChange={(e) => setCurrentStep(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addBreakdownStep()}
                  data-testid="input-breakdown-step"
                />
                <Button
                  onClick={addBreakdownStep}
                  variant="outline"
                  size="icon"
                  data-testid="button-add-step"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminders" className="text-base">Reminder Preference</Label>
            <div className="flex gap-2">
              {["None", "1", "2", "3"].map((count) => (
                <Badge
                  key={count}
                  variant={reminderCount === count ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 hover-elevate active-elevate-2"
                  onClick={() => setReminderCount(count)}
                  data-testid={`reminder-${count}`}
                >
                  {count === "None" ? "No Reminders" : `${count} Reminder${count !== "1" ? "s" : ""}`}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            data-testid="button-create-task"
            className="rounded-full px-8"
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
