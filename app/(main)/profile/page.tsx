import { getUserProgress, getCourseProgress, getProfiling, getUserInitial, getTotalChallengesByCourse, getTotalChallengesOverall, getChallengeCompletionPercentage } from "@/db/queries";
import { ProfilePageWrapper } from "@/components/profile/ProfilePageWrapper";
import { UserProgress } from "@/components/profile/UserProgress";
import { AverageHearts } from "@/components/profile/AverageHearts";
import CourseProgressOverview from "@/components/profile/CourseChallengeCompletion";
import { redirect } from "next/navigation";
import { UserTitle } from "@/components/profile/UserTitle";
import { UserProfileTitle } from "@/components/profile/Profile";

const ProfilePage = async () => {
  // Fetch user progress and other related data
  const userProgress = await getUserProgress();
  const courseProgress = await getCourseProgress();
  const userProfile = await getProfiling();  // Fetch the profile (Student or Employee)
  const userInitial = await getUserInitial(); // Fetch user title

  // Fetch additional data for course progress
  const totalChallengesByCourse = await getTotalChallengesByCourse();
  const totalChallengesOverall = await getTotalChallengesOverall();
  
  const challengeCompletionData = userProgress?.userId
    ? await getChallengeCompletionPercentage(userProgress.userId)
    : { completionPercentage: 0 }; // Fallback to default if userId is undefined
  
  if (!userProgress || !courseProgress || !userProfile || !userInitial || !totalChallengesByCourse) {
    redirect("/courses");
    return; // Make sure to return to avoid further execution if redirect happens
  }

  // Ensure that userProfile.profile is either "Student" or "Employee"
  const profile = userProfile.profile as "Student" | "Employee";  // Type assertion to "Student" | "Employee"

  // Example: calculate totalHearts based on lessons completed and hearts per lesson
  const heartsPerLesson = userProgress.hearts; // You can adjust this based on your system
  const totalHearts = courseProgress.lessonsCompleted * heartsPerLesson;

  // Return the profile page with all the required data passed down to the components
  return (
    <ProfilePageWrapper>
      <UserProfileTitle profile={profile} /> {/* Display User Profile */}
      <UserTitle title={userInitial.title} />
      <UserProgress
        userName={userProgress.userName}
        points={userProgress.points}
        hearts={userProgress.hearts}
      />
      
      <AverageHearts 
        hearts={userProgress.hearts} 
        lessonsCompleted={courseProgress.lessonsCompleted} 
        totalHearts={totalHearts} 
      />
      <CourseProgressOverview 
        totalChallengesByCourse={totalChallengesByCourse} 
        totalChallengesOverall={totalChallengesOverall}
        completionPercentage={challengeCompletionData.completionPercentage}
      />
      
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
