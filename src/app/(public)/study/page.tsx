import CourseStudy from '@/components/Course/CourseStudy';
import Heading from '@/components/Typography/Heading';
import { getUserCourses } from '@/lib/actions/user.actions';

export const metadata = {
  title: 'Study Area'
};

const Study = async () => {
  const courses = await getUserCourses();

  return (
    <section className='mb-[85px] lg:mb-0'>
      <Heading>Khu vực học tập</Heading>
      <CourseStudy
        courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
      />
    </section>
  );
};

export default Study;
