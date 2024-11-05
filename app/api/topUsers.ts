// pages/api/topUsers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getTopTenUsers } from '@/db/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const topUsers = await getTopTenUsers();
        res.status(200).json(topUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top users', error });
    }
}
