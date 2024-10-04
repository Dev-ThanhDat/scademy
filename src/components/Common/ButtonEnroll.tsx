'use client';

import { IUser } from '@/database/user.model';
import { useToast } from '@/hooks/use-toast';
import { createOrder } from '@/lib/actions/order.actions';
import { createOrderCode } from '@/utils/createOrderCode';
import { useRouter } from 'next/navigation';

const ButtonEnroll = ({
  user,
  courseId,
  price
}: {
  user: IUser | null | undefined;
  courseId: string;
  price: number;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleEnrollCourse = async () => {
    if (!user?.username) {
      toast({
        variant: 'error',
        title: 'Vui lòng đăng nhập để mua khóa học.',
        duration: 1000
      });
      return;
    }
    const newOrder = await createOrder({
      code: createOrderCode(),
      user: user._id,
      course: courseId,
      price: price
    });
    if (newOrder.code) {
      router.push(`/order/${newOrder.code}`);
    }
  };

  return (
    <button
      onClick={handleEnrollCourse}
      className='bg-secondary text-white border border-secondary py-1 px-4 rounded-full min-w-[180px] font-bold  uppercase text-base hover:bg-white hover:text-secondary transition-all'
    >
      Mua khóa học
    </button>
  );
};

export default ButtonEnroll;
