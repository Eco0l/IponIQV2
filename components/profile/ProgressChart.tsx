"use client"
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import { Heart, Smile } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

type Averages = {
  averageHeartsRemaining: number;
  averageMistakes: number;
};

const ProgressChart: React.FC<{ averages: Averages }> = ({ averages }) => {
  const { averageHeartsRemaining, averageMistakes } = averages;

  const barData = {
    labels: ["Hearts Remaining", "Mistakes"],
    datasets: [
      {
        label: "Average Progress Metrics",
        data: [averageHeartsRemaining, averageMistakes],
        backgroundColor: ["#22c55e", "#ef4444"], // Green for hearts, red for mistakes
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ["Hearts Used", "Hearts Remaining"],
    datasets: [
      {
        label: "Hearts Distribution",
        data: [10 - averageHeartsRemaining, averageHeartsRemaining],
        backgroundColor: ["#ef4444", "#22c55e"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-4">User Progress Analytics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div>
          <h4 className="text-base font-medium flex items-center mb-2">
            <Smile className="mr-2 text-green-500" />
            Average Progress Metrics
          </h4>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        {/* Doughnut Chart */}
        <div>
          <h4 className="text-base font-medium flex items-center mb-2">
            <Heart className="mr-2 text-red-500" />
            Hearts Distribution
          </h4>
          <Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
