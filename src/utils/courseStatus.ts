import { ECourseStatus } from '@/types/enums';

export const courseStatus: {
  title: string;
  value: ECourseStatus;
  className?: string;
}[] = [
  {
    title: 'Đã duyệt',
    value: ECourseStatus.APPROVED,
    className: 'text-green-00b'
  },
  {
    title: 'Chờ duyệt',
    value: ECourseStatus.PENDING,
    className: 'text-orange-ff8'
  },
  {
    title: 'Từ chối',
    value: ECourseStatus.REJECTED,
    className: 'text-red-f3'
  }
];
