import { IconNew } from '@/assets/icons';
import imageNotFound from '@/assets/images/image-not-found.png';
import { ICourse } from '@/database/course.model';
import Image from 'next/image';
import Link from 'next/link';

const CourseItem = ({ data }: { data: ICourse }) => {
  return (
    <article className='flex flex-col rounded-2xl overflow-hidden bg-black-o8 relative shadow-lg hover:shadow-xl transition-all'>
      <div className='shrink-0'>
        <Image
          src={data.image || imageNotFound}
          alt='Image course'
          width={600}
          height={338}
          className='w-full h-full object-cover'
          sizes='@media  (max-width: 46.1875em) 300px, 192px'
          priority
        />
      </div>
      <div className='flex flex-col gap-3 py-4 px-[20px]'>
        <span className='absolute top-3 left-3  w-[26px] pointer-events-none bg-black-4d rounded-lg flex items-center justify-center p-[5px]'>
          <IconNew className='w-4' />
        </span>
        <h3 className='font-bold text-base leading-[1.4] line-clamp-1'>
          <Link
            href={`/course/${data.slug}`}
            className='line-clamp-1 inline'
          >
            {data.title}
          </Link>
        </h3>
        <span className='text-red-f3 font-bold text-base'>
          {data.price.toLocaleString('vi-VI')}đ
        </span>
        <div className='flex items-center justify-between'>
          <Link
            href={`/course/${data.slug}`}
            className='w-full p-2 text-center bg-secondary rounded-md  text-white hover:bg-white hover:text-secondary transition-all border border-secondary font-semibold'
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseItem;
