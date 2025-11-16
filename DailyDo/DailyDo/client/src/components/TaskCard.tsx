import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreVertical, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";

interface TaskCardProps {
  id: string;
  title: string;
  purpose?: string;
  deadline?: Date;
  category: string;
  completed: boolean;
  breakdown?: string[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Work: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20",
  "Personal Growth": "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/20",
  Fitness: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border-green-500/20",
  Creative: "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 border-pink-500/20",
  Social: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 border-orange-500/20",
  Learning: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-500/20",
};

export function TaskCard({
  id,
  title,
  purpose,
  deadline,
  category,
  completed,
  breakdown,
  onToggle,
  onDelete,
  onEdit,
}: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className={`p-6 transition-all duration-300 hover-elevate ${
        completed ? "opacity-60" : ""
      }`}
      data-testid={`task-card-${id}`}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className="mt-1 h-5 w-5"
          data-testid={`checkbox-task-${id}`}
        />

        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3
              className={`text-lg font-semibold cursor-pointer ${
                completed ? "line-through" : ""
              }`}
              onClick={() => setExpanded(!expanded)}
              data-testid={`text-task-title-${id}`}
            >
              {title}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:opacity-100"
                  data-testid={`button-task-menu-${id}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(id)} data-testid={`menu-edit-${id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(id)}
                  className="text-destructive"
                  data-testid={`menu-delete-${id}`}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className={categoryColors[category] || ""} variant="outline">
              {category}
            </Badge>
            {deadline && (
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                {format(deadline, "MMM d")}
              </Badge>
            )}
          </div>

          {expanded && purpose && (
            <p className="text-sm text-muted-foreground animate-fade-in-up" data-testid={`text-purpose-${id}`}>
              {purpose}
            </p>
          )}

          {expanded && breakdown && breakdown.length > 0 && (
            <div className="space-y-1 animate-fade-in-up">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Steps
              </p>
              {breakdown.map((step, index) => (
                <div key={index} className="flex gap-2 text-sm">
                  <span className="text-muted-foreground">{index + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
