// src/components/profile/LessonProgress.tsx
import { Progress } from "@/components/ui/progress";

interface LessonProgressProps {
  percentage: number;
}

export const LessonProgress = ({ percentage }: LessonProgressProps) => (
  <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm">
    <h3 className="text-lg font-semibold mb-2">Lesson Completion</h3>
    <Progress value={percentage} className="h-4" />
  </div>
);
