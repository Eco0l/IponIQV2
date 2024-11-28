import { BookOpen, Info } from "lucide-react"; // Import icons from Lucide

interface CourseProgressProps {
  activeCourse: { title: string } | null; // Allow null for activeCourse
}

export const CourseProgress = ({ activeCourse }: CourseProgressProps) => (
  <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-sm">
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
      {/* Display icon depending on the course status */}
      {activeCourse ? (
        <BookOpen className="text-blue-500 w-6 h-6" />
      ) : (
        <Info className="text-gray-500 w-6 h-6" />
      )}
      Current Course
    </h2>
    
    {/* Display course title or fallback text */}
    <p className="text-lg text-gray-800">{activeCourse ? activeCourse.title : "No active course"}</p>
    
    {/* Optional description or additional information */}
    {!activeCourse && (
      <p className="text-sm text-gray-500 mt-2">You can start a new course from the courses list.</p>
    )}
  </div>
);
