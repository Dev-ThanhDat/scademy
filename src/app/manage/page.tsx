import { IconAdd, IconChevronLeft } from '@/assets/icons';
import CourseManage from '@/components/Course/CourseManage';
import Heading from '@/components/Typography/Heading';
import { getAllCourse } from '@/lib/actions/course.action';
import { ECourseStatus } from '@/types/enums';
import Link from 'next/link';

export const metadata = {
  title: 'Course'
};

const Courses = async ({
  searchParams
}: {
  searchParams: {
    page: number;
    search: string;
    status: ECourseStatus;
  };
}) => {
  const courses = await getAllCourse({
    page: searchParams.page || 1,
    limit: 5,
    search: searchParams.search,
    status: searchParams.status
  });
  if (!courses) return null;

  return (
    <section>
      <div className='flex items-end'>
        <Link
          href={'/'}
          className='flex items-center gap-2 hover:text-primary transition-all'
        >
          <span>
            <IconChevronLeft className='size-[15px]' />
          </span>
          <span>Trang chủ</span>
        </Link>
      </div>
      <Heading>Quản lý khóa học.</Heading>
      <Link
        href={'/manage/courses/new'}
        className='mb-5 size-10 fixed right-5 z-20 bottom-[70px] lg:bottom-0 text-white rounded-md bg-primary flex items-center justify-center transition-all hover:bg-opacity-85 animate-bounce'
      >
        <IconAdd className='size-[25px]' />
      </Link>
      <CourseManage courses={JSON.parse(JSON.stringify(courses))} />
    </section>
  );
};

export default Courses;
