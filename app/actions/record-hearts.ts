"use server";

import {  eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { userHeartsHistory, lessons, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export const upsertUserHeartsHistory = async (lessonId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized"); 
  }

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  // Fetch the lesson information
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId)
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  const heartsRemaining = Math.max(currentUserProgress.hearts - 1, 0); // Decrement hearts after lesson completion

  // Insert into user_hearts_history table
  await db.insert(userHeartsHistory).values({
    userId,
    lessonId,
    heartsRemaining,
  });

  // Update user progress (hearts count)
  await db.update(userProgress).set({
    hearts: heartsRemaining,
  }).where(eq(userProgress.userId, userId));

  // Revalidate necessary pages to reflect the heart update
  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};
