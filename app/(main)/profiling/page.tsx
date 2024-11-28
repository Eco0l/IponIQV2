"use client";
import { useState } from "react";
import Link from "next/link";
import { User, Briefcase } from "lucide-react";

const Page = () => {
  const [showKnowledgePrompt, setShowKnowledgePrompt] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChoice = async (profile: "Student" | "Employee") => {
    try {
      const response = await fetch("/api/profiling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile }),
      });

      if (response.ok) {
        setShowKnowledgePrompt(true); // Show the "Wanna gauge your knowledge?" question
      } else {
        setError("Failed to save your profile. Please try again.");
      }
    } catch (err) {
      setError("Failed to save your profile. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {!showKnowledgePrompt ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Are you a Student or an Employee?
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-4">
              <button
                onClick={() => handleChoice("Student")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all"
              >
                <User className="w-5 h-5" />
                I am a Student
              </button>
              <button
                onClick={() => handleChoice("Employee")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:ring-offset-2 transition-all"
              >
                <Briefcase className="w-5 h-5" />
                I am an Employee
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Wanna gauge your knowledge?</h2>
            <div className="space-y-4">
              <Link href="/pre-test-prompt">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all">
                  Yes
                </button>
              </Link>
              <Link href="/courses">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:ring-offset-2 transition-all">
                  Start from scratch
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
