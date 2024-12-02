// src/components/profile/UserTitle.tsx
import { Star } from "lucide-react"; // Importing the Lucide icon for the title

type UserTitleProps = {
  title: string; // The title passed from the ProfilePage
};

export const UserTitle = ({ title }: UserTitleProps) => {
  // Define descriptions for each title
  const descriptions: Record<string, string> = {
    Beginner: "You are just starting out to learn things about Investments! Keep it up!",
    Knowledgeable: "You know the basics! But you can also start from the beginning. Keep it up!",
    "Investment Literate":
      "You finished most of the courses about Investments! To grasp more about it, you can repeat the courses to refresh your knowledge!",
  };

  // Get the description based on the title or use a default
  const description = descriptions[title] || descriptions["Beginner"];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm flex items-center gap-4">
      {/* Icon to represent User Title */}
      <Star className="w-8 h-8 text-yellow-500" /> {/* Star icon from Lucide for achievement */}

      <div>
        <h2 className="text-xl font-semibold text-gray-800">User Rank</h2>
        {/* Dynamically display the title */}
        <p className="text-lg font-medium text-gray-600">{title || "Beginner"}</p>
        {/* Display the description */}
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>
    </div>
  );
};
