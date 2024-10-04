'use client';

import CourseItemStudy from '@/components/Course/CourseItemStudy';
import { StudyCoursesProps } from '@/types';

const CourseStudy = ({
  courses
}: {
  courses: StudyCoursesProps[] | null | undefined;
}) => {
  if (!courses || courses.length <= 0) return null;
  let lastLessonList = [];
  if (typeof localStorage !== 'undefined') {
    lastLessonList = localStorage
      ? JSON.parse(localStorage?.getItem('lastLesson') || '[]') || []
      : [];
  }

  return (
    <div className='md:max-w-[500px] lg:max-w-[800px]  w-full mx-auto lg:mt-10 flex flex-col gap-6'>
      {courses &&
        courses.length > 0 &&
        courses?.map((item) => {
          const url =
            lastLessonList.find((el: any) => el.course === item.slug)?.lesson ||
            '';
          const firstLessonUrl = item?.lectures[0]?.lessons[0].slug;

          return (
            <CourseItemStudy
              key={item.slug}
              data={item}
              url={url || `/${item.slug}/lesson?slug=${firstLessonUrl}`}
            ></CourseItemStudy>
          );
        })}
    </div>
  );
};

export default CourseStudy;
