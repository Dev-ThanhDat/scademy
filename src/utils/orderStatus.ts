import { EOrderStatus } from '@/types/enums';

export const orderStatus: {
  title: string;
  value: EOrderStatus;
  className?: string;
}[] = [
  {
    title: 'Đã duyệt',
    value: EOrderStatus.COMPLETED,
    className: 'text-green-00b'
  },
  {
    title: 'Chờ duyệt',
    value: EOrderStatus.PENDING,
    className: 'text-orange-ff8'
  },
  {
    title: 'Đã hủy',
    value: EOrderStatus.CANCELED,
    className: 'text-red-f3'
  }
];
