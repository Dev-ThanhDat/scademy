'use client';

import { IconChevronLeft } from '@/assets/icons';
import { useRouter } from 'next/navigation';

const ReturnLink = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='flex items-center gap-2 hover:text-primary transition-all'
    >
      <span>
        <IconChevronLeft className='size-[15px]' />
      </span>
      <span>Quay lại</span>
    </button>
  );
};

export default ReturnLink;
