// src/components/profile/LessonProgress.tsx
"use client";

import { CheckCircle, Loader } from "lucide-react"; // Import icons
import { Progress } from "@/components/ui/progress";

interface LessonProgressProps {
  percentage: number; // Ensure that percentage is declared in the component's props
}

export const LessonProgress = ({ percentage }: LessonProgressProps) => {
  if (percentage === null) {
    // Handle error state if no percentage is provided
    return <div>Error: No percentage data available.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {percentage === 100 ? (
          <CheckCircle className="text-green-500 w-5 h-5" />
        ) : (
          <Loader className="animate-spin text-blue-500 w-5 h-5" />
        )}
        Lesson Completion
      </h3>

      <Progress value={percentage} className="h-4 rounded-full" />

      <div className="mt-2 text-sm text-gray-500 text-center">{percentage}% Complete</div>
    </div>
  );
};
