import SidebarCheckAdmin from '@/components/Common/SidebarCheckAdmin';
import MenuItem from '@/components/Sidebar/MenuItem';
import { menu } from '@/utils/menu';

const Sidebar = () => {
  return (
    <aside className='px-2 py-4 mt-[var(--header-height)] fixed lg:top-0 right-0 border border-t-gray-400 lg:border-none left-0 bottom-0 shrink-0 lg:w-[var(--sidebar-height)] flex-col items-center bg-white z-20 '>
      <ul className='flex lg:flex-col items-center justify-center gap-2'>
        {menu.length > 0 &&
          menu.map((item, index) => (
            <MenuItem
              key={index}
              url={item.url}
              title={item.title}
              icon={item.icon}
            />
          ))}
        <SidebarCheckAdmin />
      </ul>
    </aside>
  );
};

export default Sidebar;
