import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface CelebrationModalProps {
  open: boolean;
  quote: string;
  onClose: () => void;
}

const confettiColors = [
  "bg-primary",
  "bg-purple-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
];

export function CelebrationModal({ open, quote, onClose }: CelebrationModalProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (open) {
      const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      }));
      setConfetti(particles);

      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Task Completed</DialogTitle>
        </VisuallyHidden>
        <div className="relative py-16 text-center space-y-6">
          {confetti.map((particle) => (
            <div
              key={particle.id}
              className={`absolute w-2 h-2 ${particle.color} rounded-full`}
              style={{
                left: `${particle.left}%`,
                top: "-10%",
                animation: `confetti-fall ${2 + Math.random()}s linear ${particle.delay}s forwards`,
              }}
            />
          ))}

          <div className="relative z-10 space-y-6 animate-scale-in">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-glow-pulse">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Task Completed!</h2>
              <p className="text-3xl font-serif italic text-primary max-w-xl mx-auto leading-relaxed">
                "{quote}"
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
