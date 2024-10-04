'use client';

import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconTrash
} from '@/assets/icons';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import useQueryString from '@/hooks/useQueryString';
import { updateOrder } from '@/lib/actions/order.actions';
import { cn } from '@/lib/utils';
import { IOrderManageProps } from '@/types';
import { EOrderStatus } from '@/types/enums';
import { orderStatus } from '@/utils/orderStatus';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const OrderManage = ({ orders = [] }: { orders: IOrderManageProps[] }) => {
  const { toast } = useToast();
  const { createQueryString, router, pathname } = useQueryString();
  const [page, setPage] = useState(1);

  // Search code a order
  const handleSearchOrder = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(`${pathname}?${createQueryString('search', e.target.value)}`);
    },
    500
  );

  // Select status a order
  const handleSelectStatus = (status: EOrderStatus) => {
    router.push(`${pathname}?${createQueryString('status', status)}`);
  };

  // Pagination of course manage
  const handlePagination = (type: 'prev' | 'next') => {
    if (type === 'prev' && page === 1) return;
    if (type === 'prev') setPage((prev) => prev - 1);
    if (type === 'next') setPage((prev) => prev + 1);
  };

  // Cancel a orser
  const handleUpdateOrder = async ({
    orderId,
    status
  }: {
    orderId: string;
    status: EOrderStatus;
  }) => {
    if (status === EOrderStatus.CANCELED) {
      Swal.fire({
        title: 'Bạn chắc chứ?',
        text: 'Bạn có muốn hủy đơn hàng không!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đòng ý!',
        cancelButtonText: 'Không'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateOrder({ orderId, status });
        }
      });
    }
    if (status === EOrderStatus.COMPLETED) {
      const response = await updateOrder({ orderId, status });
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Cập nhật đơn hàng thành công.',
          duration: 1000
        });
      }
    }
  };

  useEffect(() => {
    router.push(`${pathname}?${createQueryString('page', page.toString())}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <div className='flex items-center flex-col lg:flex-row gap-5 mb-5'>
        <div className='w-full sm:w-[300px]'>
          <Input
            placeholder='Tìm kiếm đơn hàng...'
            onChange={(e) => handleSearchOrder(e)}
          />
        </div>
        <div>
          <Select
            onValueChange={(value) => handleSelectStatus(value as EOrderStatus)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Chọn trạng thái' />
            </SelectTrigger>
            <SelectContent>
              {orderStatus.map((status) => (
                <SelectItem
                  value={status.value}
                  key={status.value}
                >
                  {status.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className='table-rps'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center w-[160px]'>Mã đơn hàng</TableHead>
            <TableHead className='text-center w-[300px]'>Khóa học</TableHead>
            <TableHead className='text-center w-[220px]'>Thành viên</TableHead>
            <TableHead className='text-center'>Số tiền</TableHead>
            <TableHead className='text-center'>Trạng thái</TableHead>
            <TableHead className='text-center'>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 &&
            orders.map((order) => (
              <TableRow key={order.code}>
                <TableCell
                  width={160}
                  className='font-bold text-center'
                >
                  <p>{order.code}</p>
                </TableCell>
                <TableCell className='text-center'>
                  <p className='line-clamp-2 w-[300px]'>{order.course.title}</p>
                </TableCell>
                <TableCell className='text-center'>
                  <p className='line-clamp-1 '>{order.user.username}</p>
                </TableCell>
                <TableCell className='text-center'>
                  <span className='line-clamp-1 text-red-f3 font-semibold'>
                    {order.price.toLocaleString('vi-VI')}đ
                  </span>
                </TableCell>
                <TableCell className='text-center'>
                  <span
                    className={cn(
                      orderStatus.find((item) => item.value === order.status)
                        ?.className,
                      'border border-current px-2 py-1 inline-block w-[100px] rounded-md font-semibold bg-white'
                    )}
                  >
                    {
                      orderStatus.find((item) => item.value === order.status)
                        ?.title
                    }
                  </span>
                </TableCell>
                <TableCell className='text-center'>
                  {order.status !== EOrderStatus.CANCELED && (
                    <div className='flex gap-3 items-center justify-center'>
                      {order.status === EOrderStatus.PENDING && (
                        <button
                          type='button'
                          onClick={() =>
                            handleUpdateOrder({
                              orderId: order._id,
                              status: EOrderStatus.COMPLETED
                            })
                          }
                          className='size-8 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-2'
                        >
                          <IconCheck />
                        </button>
                      )}

                      <button
                        type='button'
                        onClick={() =>
                          handleUpdateOrder({
                            orderId: order._id,
                            status: EOrderStatus.CANCELED
                          })
                        }
                        className='size-8 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-2'
                      >
                        <IconTrash />
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className='flex items-center justify-end gap-3 mt-5 mb-[85px] lg:mb-0'>
        <button
          type='button'
          onClick={() => handlePagination('prev')}
          className='size-10 rounded-md bg-secondary border border-secondary hover:bg-white transition-all hover:text-secondary text-white flex items-center justify-center'
        >
          <IconChevronLeft className='size-[20px]' />
        </button>
        <button
          type='button'
          onClick={() => handlePagination('next')}
          className='size-10 rounded-md bg-secondary border border-secondary hover:bg-white transition-all hover:text-secondary text-white flex items-center justify-center'
        >
          <IconChevronRight className='size-[20px]' />
        </button>
      </div>
    </div>
  );
};

export default OrderManage;
