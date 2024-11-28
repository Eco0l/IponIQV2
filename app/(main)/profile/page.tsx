// src/app/profile/page.tsx
import { getUserProgress, getCourseProgress, getLessonPercentage, getProfiling, getUserInitial } from "@/db/queries";
import { ProfilePageWrapper } from "@/components/profile/ProfilePageWrapper";
import { UserProgress } from "@/components/profile/UserProgress";
import { CourseProgress } from "@/components/profile/CourseProgress";
import { LessonProgress } from "@/components/profile/LessonProgress";
import { AverageHearts } from "@/components/profile/AverageHearts";
import { redirect } from "next/navigation";
import { UserTitle } from "@/components/profile/UserTitle";
import { UserProfileTitle } from "@/components/profile/Profile";  // New component to show User Profile

const ProfilePage = async () => {
  const userProgress = await getUserProgress();
  const courseProgress = await getCourseProgress();
  const lessonPercentage = await getLessonPercentage();
  const userProfile = await getProfiling();  // Fetch the profile (Student or Employee)
  const userInitial = await getUserInitial(); // Fetch user title

  if (!userProgress || !courseProgress || !userProfile || !userInitial) {
    redirect("/courses");
  }

  // Ensure that userProfile.profile is either "Student" or "Employee"
  const profile = userProfile.profile as "Student" | "Employee";  // Type assertion to "Student" | "Employee"

  // Example: calculate totalHearts based on lessons completed and hearts per lesson
  const heartsPerLesson = userProgress.hearts; // You can adjust this based on your system
  const totalHearts = courseProgress.lessonsCompleted * heartsPerLesson;

  return (
    <ProfilePageWrapper>
      <UserProfileTitle profile={profile} /> {/* Display User Profile */}
      <UserProgress
        userName={userProgress.userName}
        points={userProgress.points}
        hearts={userProgress.hearts}
      />
      <CourseProgress activeCourse={userProgress.activeCourse} />
      <LessonProgress percentage={lessonPercentage} />
      <AverageHearts 
        hearts={userProgress.hearts} 
        lessonsCompleted={courseProgress.lessonsCompleted} 
        totalHearts={totalHearts} 
      />
      {/* Pass the user's title (e.g., "Beginner") to the UserTitle component */}
      <UserTitle title={userInitial.title} />
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
