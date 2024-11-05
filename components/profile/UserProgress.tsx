// src/components/profile/UserProgress.tsx
import { Heart, Star } from "lucide-react"; // Import specific icons individually

interface UserProgressProps {
  userName: string;
  points: number;
  hearts: number;
}

export const UserProgress = ({ userName, points, hearts }: UserProgressProps) => (
  <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm">
    <h2 className="text-xl font-bold mb-2">{userName}</h2>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Heart className="text-red-500" />
        <span>{hearts} Hearts</span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="text-yellow-500" />
        <span>{points} Points</span>
      </div>
    </div>
  </div>
);
