"use client"
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';

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
        label: 'Average Remaining Hearts per Lesson',
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
        text: 'Average Remaining Hearts per Lesson',
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
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-xl font-bold mb-2">Average Remaining Hearts per Lesson</h2>
      <Line data={data} options={options} />
      <p className="mt-2">Average Remaining Hearts: {averageRemainingHearts.toFixed(2)}</p>
    </div>
  );
};
