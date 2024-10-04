import Link from 'next/link';
import React from 'react';

const ButtonAction = ({
  url,
  icon
}: {
  url: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link
      href={url}
      className='size-8 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-2'
    >
      {icon}
    </Link>
  );
};

export default ButtonAction;
