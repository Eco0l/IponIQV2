"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import db from "@/db/drizzle";
import { userInitial } from "@/db/schema";
import { getChallengeCompletionPercentage } from "@/db/queries";

/**
 * Fetches the user's initial score and title based on the `user_initial` table.
 */
export const getUserInitial = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null; // If the user is not authenticated, return null
  }

  // Fetch the userInitial data for the authenticated user
  const data = await db.query.userInitial.findFirst({
    where: eq(userInitial.userId, userId),
  });

  // Return the score and title if the data is found
  return data ? { score: data.score, title: data.title } : null;
};

/**
 * Updates or refreshes the cache paths if needed.
 * This can be used to invalidate and refresh data where applicable.
 */
export const refreshUserInitialCache = async () => {
  revalidatePath("/path/to/page"); // Replace with the actual paths you want to revalidate
};

/**
 * Updates the user's title based on their challenge completion percentage.
 */
export const updateUserTitleBasedOnProgress = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized"); // Ensure user is authenticated
  }

  // Fetch the user's challenge completion percentage
  const { completionPercentage } = await getChallengeCompletionPercentage(userId);

  // Determine the new title based on the completion percentage
  let newTitle = null;
  if (completionPercentage >= 100) {
    newTitle = "Investment Literate";
  } else if (completionPercentage >= 25) {
    newTitle = "Knowledgeable";
  }

  if (newTitle) {
    // Update the user's title in the `userInitial` table
    await db.update(userInitial)
      .set({ title: newTitle })
      .where(eq(userInitial.userId, userId));

    // Revalidate paths as needed
    revalidatePath("/path/to/page"); // Adjust paths to match your application's structure
  }
};
