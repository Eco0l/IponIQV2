import { saveUserInitial } from "@/db/queries"; // Ensure this logic remains server-side

export async function POST(req: Request) {
  const { score, title } = await req.json(); // Extract score and title from the request body

  // Call your existing server-side save function
  await saveUserInitial(score, title);

  return new Response("Success", { status: 200 });
}
