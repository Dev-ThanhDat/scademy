import { cn } from '@/lib/utils';
import React from 'react';

const Heading = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn('text-2xl font-extrabold mt-4 mb-6', className)}>
      {children}
    </h1>
  );
};

export default Heading;
