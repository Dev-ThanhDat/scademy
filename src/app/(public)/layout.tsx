import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className='mt-[var(--header-height)] h-[calc(100vh-var(--header-height))]'>
        <Sidebar />
        <main className='lg:ml-[var(--sidebar-height)] pt-[15px] pb-10 px-[15px] lg:px-[30px] '>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
