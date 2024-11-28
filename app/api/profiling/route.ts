import { saveUserProfile } from "@/db/queries";
import { auth } from "@clerk/nextjs/server"; // This will work on the server side

export async function POST(req: Request) {
  const { profile } = await req.json(); // Get the profile choice from the body

  const { userId } = await auth(); // Get the userId from Clerk's auth
  if (!userId) {
    return new Response("User not authenticated", { status: 401 });
  }

  try {
    // Save the profile in the database
    await saveUserProfile(profile);
    return new Response("Profile saved successfully", { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response("Failed to save profile", { status: 500 });
  }
}
