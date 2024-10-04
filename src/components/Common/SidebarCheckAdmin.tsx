import MenuItem from '@/components/Sidebar/MenuItem';
import { getUserInfo } from '@/lib/actions/user.actions';
import { EUserRole } from '@/types/enums';
import { menuSidebarManage } from '@/utils/menu';
import { auth } from '@clerk/nextjs/server';
import { Fragment } from 'react';

const SidebarCheckAdmin = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const user = await getUserInfo({ userId });
  if (user && user.role !== EUserRole.ADMIN) return null;

  return (
    <Fragment>
      {user &&
        menuSidebarManage.length > 0 &&
        menuSidebarManage.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          />
        ))}
    </Fragment>
  );
};

export default SidebarCheckAdmin;
