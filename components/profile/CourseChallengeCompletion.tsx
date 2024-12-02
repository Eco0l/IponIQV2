"use client";

import { CheckCircle, XCircle, BarChart2 } from "lucide-react"; // Import icons from lucide-react

interface CourseProgressOverviewProps {
  totalChallengesByCourse: Record<string, number>; // Mapping course title to challenge count
  totalChallengesOverall: number; // Total challenges overall
  completionPercentage: number; // Completion percentage
}

const CourseProgressOverview = ({
  totalChallengesByCourse,
  totalChallengesOverall,
  completionPercentage,
}: CourseProgressOverviewProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Course Progress Overview</h2>

      {/* List of Courses */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Courses</h3>
          <ul className="list-disc pl-6">
            {Object.entries(totalChallengesByCourse).map(([courseTitle]) => (
              <li key={courseTitle} className="text-gray-800">
                {/* Display course name using courseTitle */}
                {courseTitle}:
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges by Course */}
        <div>
          <h3 className="text-lg font-medium">Challenges By Course</h3>
          <ul className="space-y-2">
            {Object.entries(totalChallengesByCourse).map(([courseTitle, challengeCount], index) => (
              <li key={index} className="flex items-center text-gray-800">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                {/* Replace courseId with actual course title */}
                {courseTitle}: {challengeCount} Challenges
              </li>
            ))}
          </ul>
        </div>

        {/* Total Challenges Overall */}
        <div>
          <h3 className="text-lg font-medium">Total Challenges Overall</h3>
          <p className="text-gray-800 flex items-center">
            <BarChart2 className="w-5 h-5 text-blue-500 mr-2" />
            {totalChallengesOverall} Challenges
          </p>
        </div>

        {/* Completion Percentage */}
        <div>
          <h3 className="text-lg font-medium">Completion Percentage</h3>
          <div className="flex items-center text-gray-800">
            <div className="flex items-center mr-2">
              {completionPercentage >= 100 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className="ml-1">{completionPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressOverview; // Ensure it's exported as default
