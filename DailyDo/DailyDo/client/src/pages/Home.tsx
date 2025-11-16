import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { TaskCreationModal } from "@/components/TaskCreationModal";
import { TaskCard } from "@/components/TaskCard";
import { CelebrationModal } from "@/components/CelebrationModal";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Sparkles } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { UserProfile, Task } from "@shared/schema";

const motivationalQuotes = [
  "The secret of getting ahead is getting started.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future depends on what you do today.",
  "Believe you can and you're halfway there.",
  "Small progress is still progress.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
];

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationQuote, setCelebrationQuote] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const { data: userProfile } = useQuery<UserProfile>({
    queryKey: ["/api/profile", userId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch profile");
      return response.json();
    },
    enabled: !!userId,
  });

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["/api/tasks", userId],
    queryFn: async () => {
      const response = await fetch(`/api/tasks?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return response.json();
    },
    enabled: !!userId,
  });

  const createProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/profile", data);
      return res.json();
    },
    onSuccess: (profile: UserProfile) => {
      setUserId(profile.id);
      localStorage.setItem("userId", profile.id);
      queryClient.setQueryData(["/api/profile", profile.id], profile);
      setShowOnboarding(false);
    },
    onError: () => {
      setShowOnboarding(true);
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!userId) throw new Error("User ID is required");
      const res = await apiRequest("POST", "/api/tasks", { ...data, userId });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks", userId] });
      setShowTaskModal(false);
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      if (!userId) throw new Error("User ID is required");
      const res = await apiRequest("POST", `/api/tasks/${taskId}/toggle`);
      return res.json();
    },
    onSuccess: (updatedTask: Task) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks", userId] });
      
      if (updatedTask.completed) {
        const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setCelebrationQuote(quote);
        setShowCelebration(true);
      }
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      if (!userId) throw new Error("User ID is required");
      await apiRequest("DELETE", `/api/tasks/${taskId}`);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks", userId] });
    },
  });

  const handleOnboardingComplete = (data: any) => {
    createProfileMutation.mutate(data);
  };

  const handleCreateTask = (taskData: any) => {
    createTaskMutation.mutate(taskData);
  };

  const handleToggleTask = (id: string) => {
    toggleTaskMutation.mutate(id);
  };

  const handleDeleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const handleEditTask = (id: string) => {
    console.log("Edit task:", id);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold" data-testid="text-app-title">Inspire</h1>
              {userProfile && (
                <p className="text-xs text-muted-foreground" data-testid="text-user-greeting">
                  Hey {userProfile.occupation}!
                </p>
              )}
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
            <TabsList>
              <TabsTrigger value="all" data-testid="filter-all">All Tasks</TabsTrigger>
              <TabsTrigger value="active" data-testid="filter-active">Active</TabsTrigger>
              <TabsTrigger value="completed" data-testid="filter-completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            onClick={() => setShowTaskModal(true)}
            className="gap-2 rounded-full"
            data-testid="button-add-task"
          >
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {filteredTasks.length === 0 ? (
          <EmptyState onCreateTask={() => setShowTaskModal(true)} />
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                purpose={task.purpose || undefined}
                deadline={task.deadline ? new Date(task.deadline) : undefined}
                category={task.category}
                completed={task.completed}
                breakdown={task.breakdown || undefined}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}
      </main>

      <TaskCreationModal
        open={showTaskModal}
        onOpenChange={setShowTaskModal}
        onSubmit={handleCreateTask}
      />

      <CelebrationModal
        open={showCelebration}
        quote={celebrationQuote}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
