import MenuItemManage from '@/components/SidebarManage/MenuItemManage';
import { menuManage } from '@/utils/menuManage';

const SidebarManage = () => {
  return (
    <aside className='hidden px-2 py-4 mt-[var(--header-height)] fixed top-0 left-0 bottom-0 shrink-0 lg:w-[250px] xl:w-[var(--sidebar-manage-height)] flex-col border-r border-r-gray-gray-e8d bg-white lg:flex'>
      <ul className='flex flex-col gap-2'>
        {menuManage.length > 0 &&
          menuManage.map((item, index) => (
            <MenuItemManage
              key={index}
              url={item.url}
              title={item.title}
              icon={item.icon}
            />
          ))}
      </ul>
    </aside>
  );
};

export default SidebarManage;
