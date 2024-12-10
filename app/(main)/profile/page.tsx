import {
  getUserProgress,
  getCourseProgress,
  getProfiling,
  getUserInitial,
  getTotalChallengesByCourse,
  getTotalChallengesOverall,
  getChallengeCompletionPercentage,
  getUserProgressAverages, // Import the new query function
} from "@/db/queries";

import { ProfilePageWrapper } from "@/components/profile/ProfilePageWrapper";
import { UserProgress } from "@/components/profile/UserProgress";
import CourseProgressOverview from "@/components/profile/CourseChallengeCompletion";
import ProgressChart from "@/components/profile/ProgressChart"; // Import the chart component
import { redirect } from "next/navigation";
import { UserTitle } from "@/components/profile/UserTitle";
import { UserProfileTitle } from "@/components/profile/Profile";

const ProfilePage = async () => {
  // Fetch user progress and other related data
  const userProgress = await getUserProgress();
  const courseProgress = await getCourseProgress();
  const userProfile = await getProfiling(); // Fetch the profile (Student or Employee)
  const userInitial = await getUserInitial(); // Fetch user title

  // Fetch additional data for course progress
  const totalChallengesByCourse = await getTotalChallengesByCourse();
  const totalChallengesOverall = await getTotalChallengesOverall();
  const challengeCompletionData = userProgress?.userId
    ? await getChallengeCompletionPercentage(userProgress.userId)
    : { completionPercentage: 0 }; // Fallback to default if userId is undefined

  // Fetch average hearts and mistakes
  const averages = await getUserProgressAverages();
  const parsedAverages = {
    averageHeartsRemaining: Number(averages?.averageHeartsRemaining || 0),
    averageMistakes: Number(averages?.averageMistakes || 0),
  };

  if (
    !userProgress ||
    !courseProgress ||
    !userProfile ||
    !userInitial ||
    !totalChallengesByCourse
  ) {
    redirect("/courses");
    return; // Make sure to return to avoid further execution if redirect happens
  }

  // Ensure that userProfile.profile is either "Student" or "Employee"
  const profile = userProfile.profile as "Student" | "Employee"; // Type assertion to "Student" | "Employee"

  return (
    <ProfilePageWrapper>
      {/* Display user profile and title */}
      <UserProfileTitle profile={profile} />
      <UserTitle title={userInitial.title} />

      {/* User progress overview */}
      <UserProgress
        userName={userProgress.userName}
        points={userProgress.points}
        hearts={userProgress.hearts}
      />

      {/* Course progress overview */}
      <CourseProgressOverview
        totalChallengesByCourse={totalChallengesByCourse}
        totalChallengesOverall={totalChallengesOverall}
        completionPercentage={challengeCompletionData.completionPercentage}
      />

      {/* Progress chart visualization */}
      {averages && <ProgressChart averages={parsedAverages} />}
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
