import React from 'react';

const CourseGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:px-[30px]'>
      {children}
    </div>
  );
};

export default CourseGrid;
