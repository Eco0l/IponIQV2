"use client";
import React, { useEffect, useState } from "react";
import { User } from "lucide-react";  // Import User icon from lucide-react

interface User {
    userId: string;
    userName: string;
    userImageSrc: string;
    points: number;
}

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/topUsers');
                const data = await response.json();
                setTopUsers(data);
            } catch (error) {
                console.error("Error fetching top users:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-yellow-500" />
                Top 10 Users by Points
            </h2>
            <ul className="space-y-4">
                {topUsers.map((user, index) => (
                    <li 
                        key={user.userId} 
                        className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
                    >
                        <span className="text-lg font-bold text-gray-700">{index + 1}.</span>
                        <img 
                            src={user.userImageSrc} 
                            alt={`${user.userName}'s avatar`} 
                            className="w-10 h-10 rounded-full border-2 border-yellow-500"
                        />
                        <div className="flex-1">
                            <p className="text-lg font-medium text-gray-800">{user.userName}</p>
                            <p className="text-sm text-gray-500">{user.points} Points</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopUsers;
