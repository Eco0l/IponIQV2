import { cache } from "react";
import { and, eq, sql } from "drizzle-orm";


import db from "@/db/drizzle";
import { 
  challengeProgress,
  challenges,
  courses, 
  lessons, 
  profiling, 
  units, 
  userHeartsHistory, 
  userInitial, 
  userProgress,
} from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(
                  challengeProgress.userId,
                  userId,
                ),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (
        lesson.challenges.length === 0
      ) {
        return { ...lesson, completed: false };
      }

      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return challenge.challengeProgress
          && challenge.challengeProgress.length > 0
          && challenge.challengeProgress.every((progress) => progress.completed);
      });

      return { ...lesson, completed: allCompletedChallenges };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });

  return data;
});



export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  // Get units and lessons for the active course and calculate lessonsCompleted
  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const lessonsCompleted = unitsInActiveCourse.flatMap(unit => unit.lessons)
    .filter(lesson => lesson.challenges.every(challenge => 
      challenge.challengeProgress?.every(progress => progress.completed)
    )).length;

  const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return !challenge.challengeProgress
          || challenge.challengeProgress.length === 0
          || challenge.challengeProgress.some((progress) => progress.completed === false);
      });
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
    lessonsCompleted, // Make sure lessonsCompleted is included here
  };
});


export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const courseProgress = await getCourseProgress();

  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) {
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed = challenge.challengeProgress 
      && challenge.challengeProgress.length > 0
      && challenge.challengeProgress.every((progress) => progress.completed)

    return { ...challenge, completed };
  });

  return { ...data, challenges: normalizedChallenges }
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges
    .filter((challenge) => challenge.completed);
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100,
  );

  return percentage;
});

const DAY_IN_MS = 86_400_000;
export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });

  return data;
});
export const saveUserProfile = cache(async (profile: "Student" | "Employee") => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Check if the profile already exists
  const existingProfile = await db.query.profiling.findFirst({
    where: eq(profiling.userId, userId),
  });

  if (existingProfile) {
    // Update the profile if it already exists
    await db
      .update(profiling)
      .set({ profile })
      .where(eq(profiling.userId, userId));
  } else {
    // Insert a new profile
    await db.insert(profiling).values({
      userId,
      profile,
      name: "User Name", // Replace with actual name from Clerk or elsewhere
    });
  }
});

export const getProfiling = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null; // If user is not authenticated, return null
  }

  // Fetch profiling data for the authenticated user
  const data = await db.query.profiling.findFirst({
    where: eq(profiling.userId, userId),
  });

  return data; // Return the profiling data
});

export const saveUserInitial = cache(async (score: number, title: "Beginner" | "Knowledgeable" | "Investment Literate") => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Check if the user already has an entry in userInitial
  const existingUserInitial = await db.query.userInitial.findFirst({
    where: eq(userInitial.userId, userId),
  });

  if (existingUserInitial) {
    // Update the existing entry
    await db
      .update(userInitial)
      .set({ score, title })
      .where(eq(userInitial.userId, userId));
  } else {
    // Insert a new record if none exists
    await db.insert(userInitial).values({
      userId,
      score,
      title,
    });
  }
});

export const getUserInitial = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null; // If user is not authenticated, return null
  }

  // Fetch the userInitial data for the authenticated user
  const data = await db.query.userInitial.findFirst({
    where: eq(userInitial.userId, userId),
  });

  // Return score and title if found
  return data ? { score: data.score, title: data.title } : null;
});

export const getTotalChallengesByCourse = cache(async () => {
  // Fetch challenges and their related course titles
  const challengesByCourse = await db.query.challenges.findMany({
    with: {
      lesson: {
        with: {
          unit: {
            with: {
              course: true, // Fetch course data to get course titles
            },
          },
        },
      },
    },
    columns: {
      id: true,
    },
  });

  // Create an accumulator to map course titles to challenge counts
  const totalChallengesByCourse = challengesByCourse.reduce((acc, challenge) => {
    const course = challenge.lesson?.unit?.course;
    if (course) {
      const courseTitle = course.title; // Use course title instead of course ID
      acc[courseTitle] = (acc[courseTitle] || 0) + 1; // Increment challenge count by course title
    }
    return acc;
  }, {} as Record<string, number>); // Use string keys (course titles) instead of course IDs

  return totalChallengesByCourse;
});

export const getTotalChallengesOverall = cache(async () => {
  // Get all challenges, including their associated lessons, units, and courses
  const challenges = await db.query.challenges.findMany({
    with: {
      lesson: {
        with: {
          unit: {
            with: {
              course: true, // We include course info, but we're not grouping by course
            },
          },
        },
      },
    },
    columns: {
      id: true, // We're only interested in the challenge ID for counting
    },
  });

  // Simply return the total count of challenges
  const totalChallenges = challenges.length;

  return totalChallenges;
});

export const getChallengeCompletionPercentage = cache(async (userId: string) => {
  // Get the total number of challenges
  const totalChallenges = await db
    .select()
    .from(challenges)
    .then((challengesList) => challengesList.length);

  // Get the number of challenges completed by the user
  const completedChallenges = await db
    .select()
    .from(challengeProgress)
    .where(and(eq(challengeProgress.userId, userId), eq(challengeProgress.completed, true)))
    .then((completedList) => completedList.length);

  // Calculate the completion percentage
  const completionPercentage = totalChallenges > 0 
    ? (completedChallenges / totalChallenges) * 100 
    : 0;

  return {
    completedChallenges,
    totalChallenges,
    completionPercentage: parseFloat(completionPercentage.toFixed(2)), // Return up to two decimal places
  };
});


export const getUserProgressAverages = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null; // If the user isn't authenticated, return null
  }

  // Fetch hearts history
  const data = await db.query.userHeartsHistory.findMany({
    where: eq(userHeartsHistory.userId, userId),
  });

  if (data.length === 0) {
    return { averageHeartsRemaining: 0, averageMistakes: 0 };
  }

  // Calculate the averages
  const totalLessons = data.length;
  const totalHeartsRemaining = data.reduce((sum, entry) => sum + entry.heartsRemaining, 0);
  const totalMistakes = data.reduce((sum, entry, index, arr) => {
    const previousHearts = index > 0 ? arr[index - 1].heartsRemaining : 10; // Default to 10 at the start
    return sum + (previousHearts - entry.heartsRemaining);
  }, 0);

  return {
    averageHeartsRemaining: (totalHeartsRemaining / totalLessons).toFixed(2),
    averageMistakes: (totalMistakes / totalLessons).toFixed(2),
  };
});
