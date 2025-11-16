import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sparkles, Briefcase, Zap, Target, Heart } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: (data: {
    occupation: string;
    workflowStyle: string;
    shortTermGoal: string;
    longTermGoal: string;
    motivationTriggers: string[];
  }) => void;
}

const steps = [
  {
    question: "What's your primary occupation or focus?",
    icon: Briefcase,
    placeholder: "e.g., Software Engineer, Student, Entrepreneur",
    field: "occupation" as const,
  },
  {
    question: "How would you describe your workflow style?",
    icon: Zap,
    options: ["Creative", "Analytical", "Spontaneous", "Structured"],
    field: "workflowStyle" as const,
  },
  {
    question: "What's a goal you want to achieve soon?",
    icon: Target,
    placeholder: "Your short-term goal (next 1-3 months)",
    field: "shortTermGoal" as const,
  },
  {
    question: "What's your long-term vision?",
    icon: Sparkles,
    placeholder: "Your aspirations for the next year or beyond",
    field: "longTermGoal" as const,
  },
  {
    question: "What motivates you to complete tasks?",
    icon: Heart,
    options: ["Visual Progress", "Quotes & Inspiration", "Achievements", "Minimalism"],
    multiSelect: true,
    field: "motivationTriggers" as const,
  },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    occupation: "",
    workflowStyle: "",
    shortTermGoal: "",
    longTermGoal: "",
    motivationTriggers: [] as string[],
  });

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const Icon = step.icon;

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      onComplete(data);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleOptionSelect = (value: string) => {
    if (step.multiSelect) {
      const triggers = data.motivationTriggers.includes(value)
        ? data.motivationTriggers.filter((t) => t !== value)
        : [...data.motivationTriggers, value];
      setData({ ...data, motivationTriggers: triggers });
    } else {
      setData({ ...data, [step.field]: value });
    }
  };

  const canContinue = step.multiSelect
    ? data.motivationTriggers.length > 0
    : data[step.field as keyof typeof data] !== "";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full max-w-xl animate-fade-in-up">
        <Progress value={progress} className="mb-8 h-1" data-testid="progress-onboarding" />
        
        <Card className="p-8 space-y-8 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-medium tracking-tight" data-testid="text-onboarding-question">
              {step.question}
            </h2>
          </div>

          <div className="space-y-4">
            {step.options ? (
              <div className="flex flex-wrap gap-3 justify-center">
                {step.options.map((option) => {
                  const isSelected = step.multiSelect
                    ? data.motivationTriggers.includes(option)
                    : data[step.field as keyof typeof data] === option;
                  
                  return (
                    <Badge
                      key={option}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer px-6 py-3 text-base hover-elevate active-elevate-2"
                      onClick={() => handleOptionSelect(option)}
                      data-testid={`option-${option.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {option}
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <Input
                placeholder={step.placeholder}
                value={data[step.field as keyof typeof data] as string}
                onChange={(e) => setData({ ...data, [step.field]: e.target.value })}
                className="text-center text-lg p-6 border-2"
                data-testid={`input-${step.field}`}
              />
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
              data-testid="button-back"
            >
              Back
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>
            <Button
              onClick={handleNext}
              disabled={!canContinue}
              data-testid="button-continue"
              className="rounded-full px-8"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
