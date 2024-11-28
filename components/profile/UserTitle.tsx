// src/components/profile/UserTitle.tsx
import { Star } from "lucide-react"; // Importing the Lucide icon for the title

type UserTitleProps = {
  title: string; // The title passed from the ProfilePage
};

export const UserTitle = ({ title }: UserTitleProps) => (
  <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm flex items-center gap-4">
    {/* Icon to represent User Title */}
    <Star className="w-8 h-8 text-yellow-500" />  {/* Star icon from Lucide for achievement */}

    <div>
      <h2 className="text-xl font-semibold text-gray-800">User Title</h2>
      {/* Dynamically display the title */}
      <p className="text-lg font-medium text-gray-600">{title ? title : "Beginner"}</p> {/* Default to "Beginner" if no title */}
    </div>
  </div>
);
