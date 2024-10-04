'use client';

import { IActiveLinkProps } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ActiveLinkManage = ({ url, children }: IActiveLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={url}
      className={`p-3 rounded-md flex items-center gap-3 font-extrabold transition-all ${
        url === pathname
          ? 'text-white bg-secondary svg-animate'
          : 'hover:bg-secondary hover:text-white'
      } `}
    >
      {children}
    </Link>
  );
};

export default ActiveLinkManage;
