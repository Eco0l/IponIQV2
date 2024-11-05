// pages/api/progressOverview.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getCourses, getUnits, getLessonPercentage } from '@/db/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API endpoint '/api/progressOverview' reached"); // Debugging output

    try {
        const courses = await getCourses();
        const units = await getUnits();
        const lessonPercentage = await getLessonPercentage();

        // Debugging output to check fetched data
        console.log("Fetched data:", {
            courseCount: courses.length,
            unitCount: units.length,
            lessonPercentage,
        });

        res.status(200).json({
            courseCount: courses.length,
            unitCount: units.length,
            lessonPercentage,
        });
    } catch (error) {
        console.error("Error in /api/progressOverview:", error);
        res.status(500).json({ message: 'Error fetching progress overview', error });
    }
}
