import NotFound from '@/app/not-found';
import LessonContent from '@/components/Lesson/LessonContent';
import LessonNavigation from '@/components/Lesson/LessonNavigation';
import LessonSaveUrl from '@/components/Lesson/LessonSaveUrl';
import Heading from '@/components/Typography/Heading';
import { getCourseBySlug } from '@/lib/actions/course.action';
import { findAllLessons } from '@/lib/actions/lesson.actions';
import { getUserInfo } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';

export const metadata = {
  title: 'Lesson'
};

const StudyPage = async ({
  params,
  searchParams
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) return <NotFound />;
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <NotFound />;
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  if (!findUser.courses.includes(courseId as any)) return <NotFound />;
  const lessonList = await findAllLessons({ course: courseId || '' });
  const lessonDetails = lessonList?.find((el) => el.slug === slug);
  if (!lessonDetails) return null;
  const currentLessonIndex =
    lessonList?.findIndex((el) => el.slug === slug) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const prevLesson = lessonList?.[currentLessonIndex - 1];
  const videoId = lessonDetails.video_url?.split('v=').at(-1);
  const lectures = findCourse.lectures || [];

  return (
    <section className=' xl:px-[30px] xl:mr-[390px] h-full mb-[85px] lg:mb-0'>
      <LessonSaveUrl
        course={course}
        url={`/${course}/lesson?slug=${slug}`}
      />
      <div className='flex flex-col gap-5'>
        <div className='relative aspect-video'>
          <iframe
            className='w-full h-full object-fill'
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div>
          <Heading className='m-0'>{lessonDetails.title}</Heading>
        </div>
        <LessonNavigation
          nextLesson={
            !nextLesson ? '' : `/${course}/lesson?slug=${nextLesson?.slug}`
          }
          prevLesson={
            !prevLesson ? '' : `/${course}/lesson?slug=${prevLesson?.slug}`
          }
        />
        <div>
          <p className='leading-5'>{lessonDetails.content}</p>
        </div>
      </div>
      <div>
        <LessonContent
          lectures={lectures}
          course={course}
          lessonDetails={lessonDetails}
        />
      </div>
    </section>
  );
};

export default StudyPage;
