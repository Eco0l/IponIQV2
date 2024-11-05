// src/components/profile/AverageHearts.tsx
interface AverageHeartsProps {
    hearts: number;
    lessonsCompleted?: number; // Make lessonsCompleted optional
  }
  
  export const AverageHearts = ({ hearts, lessonsCompleted = 0 }: AverageHeartsProps) => {
    const averageHearts = lessonsCompleted > 0 ? (hearts / lessonsCompleted).toFixed(2) : 0;
  
    return (
      <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-2">Average Hearts per Lesson</h2>
        <p>{averageHearts}</p>
      </div>
    );
  };
  