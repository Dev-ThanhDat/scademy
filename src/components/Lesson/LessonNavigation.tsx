'use client';

import { IconChevronLeft, IconChevronRight } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const LessonNavigation = ({
  nextLesson,
  prevLesson
}: {
  nextLesson: string;
  prevLesson: string;
}) => {
  const router = useRouter();

  return (
    <div className='flex items-center gap-3'>
      <Button
        variant='secondary'
        disabled={!prevLesson}
        className='hover:bg-secondary transition-all hover:text-white'
        onClick={() => (!prevLesson ? null : router.push(prevLesson))}
      >
        <IconChevronLeft className='size-[17px]' />
        <span>Bài trước</span>
      </Button>
      <Button
        disabled={!nextLesson}
        variant='secondary'
        className='hover:bg-secondary transition-all hover:text-white'
        onClick={() => (!nextLesson ? null : router.push(nextLesson))}
      >
        <span>Bài tiếp theo</span>
        <IconChevronRight className='size-[17px]' />
      </Button>
    </div>
  );
};

export default LessonNavigation;
