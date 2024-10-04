import CourseGrid from '@/components/Common/CourseGrid';
import CourseItem from '@/components/Course/CourseItem';
import Heading from '@/components/Typography/Heading';
import { getAllCoursesPublic } from '@/lib/actions/course.action';

const Home = async () => {
  const data = (await getAllCoursesPublic({})) || [];

  return (
    <section className='mb-[85px] lg:mb-0'>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {data.length > 0 &&
          data.map((item) => (
            <CourseItem
              key={item.slug}
              data={item}
            />
          ))}
      </CourseGrid>
    </section>
  );
};

export default Home;
