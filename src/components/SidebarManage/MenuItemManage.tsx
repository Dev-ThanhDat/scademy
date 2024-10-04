import ActiveLinkManage from '@/components/Common/ActiveLinkManage';
import { IMenu } from '@/types';

const MenuItemManage = ({ url = '/', title = '', icon }: IMenu) => {
  return (
    <li>
      <ActiveLinkManage url={url}>
        <span>{icon}</span>
        <span className='line-clamp-1'>{title}</span>
      </ActiveLinkManage>
    </li>
  );
};

export default MenuItemManage;
