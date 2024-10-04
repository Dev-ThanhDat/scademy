import ReturnLink from '@/components/Common/ReturnLink';
import CourseUpdate from '@/components/Course/CourseUpdate';
import Heading from '@/components/Typography/Heading';
import { getCourseBySlug } from '@/lib/actions/course.action';

export const metadata = {
  title: 'Update Course'
};

const UpdateCourse = async ({
  searchParams
}: {
  searchParams: { slug: string };
}) => {
  const findCourse = await getCourseBySlug({
    slug: searchParams.slug
  });
  if (!findCourse) return null;

  return (
    <section>
      <ReturnLink />
      <Heading>Cập nhật khóa học.</Heading>
      <CourseUpdate data={JSON.parse(JSON.stringify(findCourse))} />
    </section>
  );
};

export default UpdateCourse;
