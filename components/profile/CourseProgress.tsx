// src/components/profile/CourseProgress.tsx
interface CourseProgressProps {
    activeCourse: { title: string } | null; // Allow null for activeCourse
  }
  
  export const CourseProgress = ({ activeCourse }: CourseProgressProps) => (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-xl font-bold mb-2">Current Course</h2>
      <p>{activeCourse ? activeCourse.title : "No active course"}</p>
    </div>
  );
  