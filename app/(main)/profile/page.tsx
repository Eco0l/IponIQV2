// src/app/profile/page.tsx
import { getUserProgress, getCourseProgress, getLessonPercentage } from "@/db/queries";
import { ProfilePageWrapper } from "@/components/profile/ProfilePageWrapper";
import { UserProgress } from "@/components/profile/UserProgress";
import { CourseProgress } from "@/components/profile/CourseProgress";
import { LessonProgress } from "@/components/profile/LessonProgress";
import { AverageHearts } from "@/components/profile/AverageHearts";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const userProgress = await getUserProgress();
  const courseProgress = await getCourseProgress();
  const lessonPercentage = await getLessonPercentage();

  if (!userProgress || !courseProgress) {
    redirect("/courses");
  }

  return (
    <ProfilePageWrapper>
      <UserProgress
        userName={userProgress.userName}
        points={userProgress.points}
        hearts={userProgress.hearts}
      />
      <CourseProgress activeCourse={userProgress.activeCourse} />
      <LessonProgress percentage={lessonPercentage} />
      <AverageHearts hearts={userProgress.hearts} lessonsCompleted={courseProgress.lessonsCompleted} />
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
