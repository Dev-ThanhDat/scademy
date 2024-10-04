import MenuItem from '@/components/Sidebar/MenuItem';
import { menuManage } from '@/utils/menuManage';

const FooterManage = () => {
  return (
    <footer className='fixed lg:hidden left-0 right-0 bottom-0 px-2 py-4 border border-t-gray-400 bg-white z-50'>
      <ul className='flex lg:flex-col items-center justify-center gap-2'>
        {menuManage.length > 0 &&
          menuManage.map((item, index) => (
            <MenuItem
              key={index}
              url={item.url}
              title={item.title}
              icon={item.icon}
            />
          ))}
      </ul>
    </footer>
  );
};

export default FooterManage;
