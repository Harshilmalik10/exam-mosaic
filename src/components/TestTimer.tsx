import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface TestTimerProps {
  duration: number;
  onTimeUp: () => void;
}

export const TestTimer = ({ duration, onTimeUp }: TestTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeUp]);

  useEffect(() => {
    setProgress((timeLeft / (duration * 60)) * 100);
  }, [timeLeft, duration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed top-0 left-0 right-0 p-4 bg-white shadow-md z-50">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">
            Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(progress)}% remaining
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};