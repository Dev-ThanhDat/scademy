'use client';

import { IActiveLinkProps } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ActiveLink = ({ url, children }: IActiveLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={url}
      className={`flex flex-col justify-center transition-all font-extrabold text-[11px] h-[50px] w-[50px] lg:h-[72px] lg:w-[72px] p-1 gap-1 items-center text-center rounded-2xl ${
        url === pathname ? ' bg-gray-e8d svg-animate' : 'hover:bg-gray-e8d'
      }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
