import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Signup'
};

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen p-5'>
      <SignUp />
    </div>
  );
}
