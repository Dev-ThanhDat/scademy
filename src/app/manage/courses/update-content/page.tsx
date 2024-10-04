import ReturnLink from '@/components/Common/ReturnLink';
import CourseContent from '@/components/Course/CourseContent';
import Heading from '@/components/Typography/Heading';
import { getCourseBySlug } from '@/lib/actions/course.action';

export const metadata = {
  title: 'Content Course'
};

const UpdateContent = async ({
  searchParams
}: {
  searchParams: { slug: string };
}) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug });
  if (!findCourse)
    return <p className='text-center mt=5'>Không tìm thấy khóa học</p>;

  return (
    <section>
      <ReturnLink />
      <Heading>
        Nội dung: <span className='text-primary'>{findCourse.title}</span>
      </Heading>
      <CourseContent course={JSON.parse(JSON.stringify(findCourse))} />
    </section>
  );
};

export default UpdateContent;
