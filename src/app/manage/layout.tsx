import NotFound from '@/app/not-found';
import FooterManage from '@/components/FooterManage';
import Header from '@/components/Header';
import SidebarManage from '@/components/SidebarManage';
import { getUserInfo } from '@/lib/actions/user.actions';
import { EUserRole } from '@/types/enums';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: {
    template: 'Manage | %s',
    default: 'Manage'
  }
};

const LayoutManage = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) return redirect('/sign-in');
  const user = await getUserInfo({ userId });
  if (user && user.role !== EUserRole.ADMIN) return <NotFound />;

  return (
    <div>
      <Header />
      <div className='mt-[var(--header-height)] h-[calc(100vh-var(--header-height))]'>
        <SidebarManage />
        <main className='lg:ml-[250px] xl:ml-[var(--sidebar-manage-height)] pt-[15px] pb-10 px-[30px]'>
          {children}
        </main>
        <FooterManage />
      </div>
    </div>
  );
};

export default LayoutManage;
