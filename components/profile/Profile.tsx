"use client";

import { User, Briefcase } from "lucide-react"; // Import relevant icons

interface UserProfileTitleProps {
  profile: "Student" | "Employee";  // Define the expected type for the profile
}

export const UserProfileTitle = ({ profile }: UserProfileTitleProps) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        You are currently registered as a 
        <span className="font-bold text-blue-500"> {profile} </span> {/* Bold and blue color to highlight profile */}
      </h2>

      {/* Add icons dynamically based on profile */}
      <div className="flex justify-center items-center gap-3">
        {profile === "Student" ? (
          <User className="w-8 h-8 text-blue-500" />  // Use the user icon for Student
        ) : (
          <Briefcase className="w-8 h-8 text-yellow-500" />  // Use the briefcase icon for Employee
        )}
      </div>
    </div>
  );
};
