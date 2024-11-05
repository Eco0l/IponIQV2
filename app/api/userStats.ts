// pages/api/userStats.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserProgress } from '@/db/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const users = await getUserProgress();
        const totalUsers = Array.isArray(users) ? users.length : 0;
        const totalProgress = Array.isArray(users) ? users.reduce((acc, user) => acc + (user.points || 0), 0) : 0;
        const averageProgress = totalUsers > 0 ? (totalProgress / totalUsers) : 0;

        res.status(200).json({ totalUsers, averageProgress });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user statistics', error });
    }
}
