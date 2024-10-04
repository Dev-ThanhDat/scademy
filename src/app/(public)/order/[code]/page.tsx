import NotFound from '@/app/not-found';
import { getOrderDetails } from '@/lib/actions/order.actions';

const OrderPage = async ({
  params
}: {
  params: {
    code: string;
  };
}) => {
  const orderDetails = await getOrderDetails({
    code: params.code
  });
  if (!orderDetails) return <NotFound />;

  return (
    <div className='flex items-center justify-center h-[calc(100vh-60px-var(--header-height))]'>
      <div className='shadow-xl border p-5 max-w-[700px] w-full rounded-lg max-h-[400px] h-full flex items-center justify-center flex-col gap-5 text-center bg-gray-100'>
        <p className='text-xl'>
          <span>Cám ơn bạn đã mua khóa học</span>
          <strong className='text-primary'>{orderDetails.course.title}</strong>
          <span>với số tiền:</span>
        </p>
        <span className='font-bold text-primary text-2xl'>
          {orderDetails.price.toLocaleString('vi-VI')}đ
        </span>
        <p className='text-lg'>
          Vui lòng chuyển khoản theo thông tin tài khoản dưới đây với nội dung:
        </p>
        <span className='font-bold text-primary text-xl'>
          {orderDetails.code}
        </span>
        <p className='text-base font-semibold uppercase'>
          Cảm ơn bạn đã mua khóa học.
        </p>
        <p className='text-base font-semibold'>
          Bạn vui lòng nhắn tin cho chủ khóa học và đợi chủ khóa học duyệt nhé.
        </p>
      </div>
    </div>
  );
};

export default OrderPage;
