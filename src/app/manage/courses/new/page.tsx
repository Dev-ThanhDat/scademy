import ReturnLink from '@/components/Common/ReturnLink';
import CourseAddNew from '@/components/Course/CourseAddNew';
import Heading from '@/components/Typography/Heading';
import { getUserInfo } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';

export const metadata = {
  title: 'Create Course'
};

const CreateCourse = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const user = await getUserInfo({ userId });
  if (!user) return null;

  return (
    <section>
      <ReturnLink />
      <Heading>Tạo khóa học.</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(user))} />
    </section>
  );
};

export default CreateCourse;
