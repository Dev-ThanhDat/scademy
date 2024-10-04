import { IconCmd, IconTruck } from '@/assets/icons';
import { IMenu } from '@/types';

export const menuManage: IMenu[] = [
  {
    url: '/manage',
    title: 'Khóa học',
    icon: <IconCmd className='size-5' />
  },
  {
    url: '/manage/orders',
    title: 'Đơn hàng',
    icon: <IconTruck className='size-5' />
  }
];
