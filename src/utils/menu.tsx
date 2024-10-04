import { IconBook, IconHome, IconWrench } from '@/assets/icons';
import { IMenu } from '@/types';

export const menu: IMenu[] = [
  {
    url: '/',
    title: 'Trang chủ',
    icon: <IconHome className='size-5' />
  },
  {
    url: '/study',
    title: 'Học tập',
    icon: <IconBook className='size-5' />
  }
];

export const menuSidebarManage: IMenu[] = [
  {
    url: '/manage',
    title: 'Quản trị',
    icon: <IconWrench className='size-5' />
  }
];
