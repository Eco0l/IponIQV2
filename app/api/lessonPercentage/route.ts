// app/api/lessonPercentage/route.ts (if using Next.js 13+ with app directory)
import { getLessonPercentage } from "@/db/queries"; // Your database function

export async function GET() {
  try {
    const percentage = await getLessonPercentage();
    return new Response(JSON.stringify({ percentage }), { status: 200 });
  } catch (error) {
    console.error("Error fetching lesson percentage:", error);
    return new Response(JSON.stringify({ percentage: 0 }), { status: 500 });
  }
}
