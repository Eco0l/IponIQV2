// ProgressOverview.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Book, Layers, Percent } from "lucide-react"; // Import icons from lucide-react

const ProgressOverview = () => {
    const [courseCount, setCourseCount] = useState(0);
    const [unitCount, setUnitCount] = useState(0);
    const [lessonPercentage, setLessonPercentage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/progressOverview');
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }
                const data = await response.json();
                setCourseCount(data.courseCount);
                setUnitCount(data.unitCount);
                setLessonPercentage(data.lessonPercentage);
            } catch (error) {
                console.error("Error fetching progress overview:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-blue-500" />
                Progress Overview
            </h2>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <Book className="w-5 h-5 text-purple-500" />
                    <p className="text-lg text-gray-600">
                        Total Courses: <span className="font-semibold text-gray-800">{courseCount}</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-green-500" />
                    <p className="text-lg text-gray-600">
                        Total Units: <span className="font-semibold text-gray-800">{unitCount}</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Percent className="w-5 h-5 text-red-500" />
                    <p className="text-lg text-gray-600">
                        Lesson Completion: <span className="font-semibold text-gray-800">{lessonPercentage}%</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProgressOverview;
