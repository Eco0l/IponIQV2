import { CheckCircle, Loader } from "lucide-react"; // Import icons
import { Progress } from "@/components/ui/progress";

interface LessonProgressProps {
  percentage: number;
}

export const LessonProgress = ({ percentage }: LessonProgressProps) => (
  <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-sm">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      {/* Display an icon dynamically based on the progress percentage */}
      {percentage === 100 ? (
        <CheckCircle className="text-green-500 w-5 h-5" /> // Green checkmark if complete
      ) : (
        <Loader className="animate-spin text-blue-500 w-5 h-5" /> // Spinning loader if in progress
      )}
      Lesson Completion
    </h3>
    
    {/* Progress bar */}
    <Progress value={percentage} className="h-4 rounded-full" />
    
    {/* Show percentage text below the progress bar */}
    <div className="mt-2 text-sm text-gray-500 text-center">{percentage}% Complete</div>
  </div>
);
