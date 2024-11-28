"use client";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Heart } from 'lucide-react'; // Import Heart icon from Lucide

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface AverageHeartsProps {
  hearts: number; // hearts earned
  totalHearts: number; // total hearts available for all lessons
  lessonsCompleted?: number; // Make lessonsCompleted optional
}

export const AverageHearts = ({
  hearts,
  totalHearts,
  lessonsCompleted = 0,
}: AverageHeartsProps) => {
  const remainingHearts = totalHearts - hearts; // Calculate remaining hearts
  const averageRemainingHearts = lessonsCompleted > 0 ? remainingHearts / lessonsCompleted : 0;

  const data = {
    labels: ['Lessons Completed'], // You could extend this for multiple lessons over time
    datasets: [
      {
        label: 'Average Mistakes Per Lesson',
        data: [averageRemainingHearts], // Using the number of remaining hearts per lesson
        borderColor: 'rgba(255, 99, 132, 1)', // Change color to distinguish it
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Average Mistakes Per Lesson',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'line'>) {
            // Explicitly cast tooltipItem.raw to a number
            const value = tooltipItem.raw as number; // Type assertion
            return `${tooltipItem.dataset.label}: ${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Heart className="text-red-500 w-6 h-6" />
        Average Mistakes Per Lesson
      </h2>
      <Line data={data} options={options} />
      <p className="mt-4 text-lg text-gray-800">
        Mistakes per Lesson:
        <span className="font-semibold text-blue-600">{averageRemainingHearts.toFixed(2)}</span>
      </p>
    </div>
  );
};
