// src/components/profile/ProfilePageWrapper.tsx
import { ReactNode } from "react";
import { User } from "lucide-react";  // Importing a Lucide icon for the profile

export const ProfilePageWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-r from-blue-50 via-green-50 to-blue-100 min-h-screen">
    {/* Profile Header Section */}
    <div className="w-full max-w-4xl text-center mb-8">
      <div className="flex justify-center mb-4">
        <User className="w-10 h-10 text-gray-800" /> {/* User icon from Lucide */}
      </div>
      <h1 className="text-3xl font-semibold text-gray-800">Your Profile</h1>
      <p className="text-gray-600 mt-2">Manage your progress, track your learning, and view your profile details below.</p>
    </div>

    {/* Main Content Area */}
    <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl space-y-6">
      {children}
    </div>
  </div>
);
