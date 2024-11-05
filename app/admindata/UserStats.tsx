"use client";
import React, { useEffect, useState } from "react";
import { Users, BarChart2 } from "lucide-react";  // Import relevant icons from lucide-react

const UserStats = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [averageProgress, setAverageProgress] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/userStats');
                const data = await response.json();
                setTotalUsers(data.totalUsers);
                setAverageProgress(data.averageProgress);
            } catch (error) {
                console.error("Error fetching user progress:", error);
                setTotalUsers(0);
                setAverageProgress(0);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <BarChart2 className="w-6 h-6 text-blue-500" />
                User Statistics
            </h2>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-500" />
                    <p className="text-lg text-gray-600">
                        Total Users: <span className="font-semibold text-gray-800">{totalUsers}</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <BarChart2 className="w-5 h-5 text-purple-500" />
                    <p className="text-lg text-gray-600">
                        Average Progress: <span className="font-semibold text-gray-800">{averageProgress.toFixed(2)}%</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserStats;
