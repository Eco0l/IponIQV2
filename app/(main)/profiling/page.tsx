"use client"; 
import { useState } from "react"; 
import Link from "next/link"; // Importing Link from next/link
import { User, Briefcase } from "lucide-react";

const Page = () => {
  const [showKnowledgePrompt, setShowKnowledgePrompt] = useState(false);

  // Handle the choice between Student or Employee
  const handleChoice = () => {
    setShowKnowledgePrompt(true); // Show the "Wanna gauge your knowledge?" question
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {!showKnowledgePrompt ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Are you a Student or an Employee?
            </h1>
            <div className="space-y-4">
              <button
                onClick={handleChoice}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all"
              >
                <User className="w-5 h-5" />
                I am a Student
              </button>
              <button
                onClick={handleChoice}
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