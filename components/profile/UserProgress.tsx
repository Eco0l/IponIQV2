// src/components/profile/UserProgress.tsx
import { Heart, Star } from "lucide-react"; // Import specific icons individually

interface UserProgressProps {
  userName: string;
  points: number;
  hearts: number;
}

export const UserProgress = ({ userName, points, hearts }: UserProgressProps) => (
  <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{userName}</h2> {/* Increased font size for better readability */}
    
    <div className="flex items-center gap-6">
      {/* Hearts Section */}
      <div className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-red-500" /> {/* Icon size increased for better visual impact */}
        <span className="text-lg font-medium text-gray-600">{hearts} Hearts</span>
      </div>
      
      {/* Points Section */}
      <div className="flex items-center gap-2">
        <Star className="w-6 h-6 text-yellow-500" /> {/* Icon size increased for better visual impact */}
        <span className="text-lg font-medium text-gray-600">{points} Points</span>
      </div>
    </div>
  </div>
);
