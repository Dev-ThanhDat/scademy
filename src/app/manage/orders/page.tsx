import { IconChevronLeft } from '@/assets/icons';
import OrderManage from '@/components/Order/OrderManage';
import Heading from '@/components/Typography/Heading';
import { getAllOrder } from '@/lib/actions/order.actions';
import { EOrderStatus } from '@/types/enums';
import Link from 'next/link';

export const metadata = {
  title: 'Order'
};

const Orders = async ({
  searchParams
}: {
  searchParams: {
    page: number;
    search: string;
    status: EOrderStatus;
  };
}) => {
  const orders = await getAllOrder({
    page: searchParams.page || 1,
    limit: 5,
    search: searchParams.search,
    status: searchParams.status
  });

  return (
    <section>
      <div className='flex items-end'>
        <Link
          href={'/'}
          className='flex items-center gap-2 hover:text-primary transition-all'
        >
          <span>
            <IconChevronLeft className='size-[15px]' />
          </span>
          <span>Trang chủ</span>
        </Link>
      </div>
      <Heading>Quản lý đơn hàng.</Heading>
      <OrderManage orders={orders ? JSON.parse(JSON.stringify(orders)) : []} />
    </section>
  );
};

export default Orders;
