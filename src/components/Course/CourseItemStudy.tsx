import imageNotFound from '@/assets/images/image-not-found.png';
import { StudyCoursesProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const CourseItemStudy = ({
  data,
  url
}: {
  data: StudyCoursesProps;
  url: string;
}) => {
  return (
    <article className='grid grid-cols-1 shadow-lg lg:grid-cols-[1fr,2fr] gap-5 rounded-2xl overflow-hidden bg-black-o8 p-5'>
      <div>
        <Image
          src={data.image || imageNotFound}
          alt='Image course'
          width={600}
          height={338}
          className='w-full object-cover rounded-md'
          sizes='@media  (max-width: 46.1875em) 300px, 192px'
          priority
        />
      </div>
      <div className='flex flex-col gap-3 items-start justify-center'>
        <h3 className='font-bold text-base leading-[1.4] line-clamp-1'>
          {data.title}
        </h3>
        <p className='line-clamp-2 leading-5'>{data.desc}</p>
        <Link
          href={url}
          className='rounded-md bg-secondary text-white font-semibold hover:opacity-75 transition-all flex items-center justify-center px-5 py-2 w-full lg:w-auto'
        >
          Học tiếp
        </Link>
      </div>
    </article>
  );
};

export default CourseItemStudy;
