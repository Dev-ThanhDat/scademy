'use client';

import logo from '@/assets/images/logo.png';
import { useAuth, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const { userId } = useAuth();

  return (
    <header className='fixed top-0 left-0 right-0 z-50 flex items-center gap-[30px] px-7 border-b border-b-gray-e8d h-[var(--header-height)] justify-between bg-white'>
      <Link
        href='/'
        className='font-bold text-2xl flex items-center gap-[5px]'
      >
        <Image
          src={logo}
          alt='Logo website'
          className='w-[38px] h-full object-cover'
        />
        <span>cademy</span>
      </Link>

      <div>
        {!userId ? (
          <Link
            href='/sign-in'
            className='py-[9px] px-5 rounded-full btn-gradient text-white font-bold transition-all hover:opacity-90'
          >
            Đăng nhập
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </header>
  );
};

export default Header;
