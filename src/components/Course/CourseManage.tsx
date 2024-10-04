'use client';

import {
  IconBook,
  IconChevronLeft,
  IconChevronRight,
  IconEyeLine,
  IconPencil,
  IconTrash
} from '@/assets/icons';
import imageNotFound from '@/assets/images/image-not-found.png';
import ButtonAction from '@/components/Common/ButtonAction';
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
import { ICourse } from '@/database/course.model';
import { useToast } from '@/hooks/use-toast';
import useQueryString from '@/hooks/useQueryString';
import { updateCourse } from '@/lib/actions/course.action';
import { cn } from '@/lib/utils';
import { ECourseStatus } from '@/types/enums';
import { courseStatus } from '@/utils/courseStatus';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const { toast } = useToast();
  const { createQueryString, router, pathname } = useQueryString();
  const [page, setPage] = useState(1);

  // Search a course
  const handleSearchCourse = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(`${pathname}?${createQueryString('search', e.target.value)}`);
    },
    500
  );

  // Select a status of course
  const handleSelectStatus = (status: ECourseStatus) => {
    router.push(`${pathname}?${createQueryString('status', status)}`);
  };

  // Pagination of course manage
  const handlePagination = (type: 'prev' | 'next') => {
    if (type === 'prev' && page === 1) return;
    if (type === 'prev') setPage((prev) => prev - 1);
    if (type === 'next') setPage((prev) => prev + 1);
  };

  // Delete a course
  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: 'Bạn có muốn xóa khóa học không!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!',
      cancelButtonText: 'Không'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true
          },
          path: '/manage/courses'
        });
        toast({
          variant: 'success',
          title: 'Xóa khóa học thành công.',
          duration: 1000
        });
      }
    });
  };

  // Change a status of course
  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: 'Bạn chắc chứ?',
        text: 'Bạn có muốn cập nhật trạng thái không!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cập nhật!',
        cancelButtonText: 'Không'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status:
                status === ECourseStatus.PENDING
                  ? ECourseStatus.APPROVED
                  : ECourseStatus.PENDING,
              _destroy: false
            },
            path: '/manage/courses'
          });
          toast({
            variant: 'success',
            title: 'Cập nhật trạng thái thành công.',
            duration: 1000
          });
        }
      });
    } catch (error) {
      console.log(error);
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
            placeholder='Tìm kiếm khóa học...'
            onChange={(e) => handleSearchCourse(e)}
          />
        </div>
        <div>
          <Select
            onValueChange={(value) =>
              handleSelectStatus(value as ECourseStatus)
            }
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Chọn trạng thái' />
            </SelectTrigger>
            <SelectContent>
              {courseStatus.map((status) => (
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
            <TableHead className='w-[500px] text-center'>Thông tin</TableHead>
            <TableHead className='w-[200px] text-center'>Giá</TableHead>
            <TableHead className='w-[200px] text-center'>Trạng thái</TableHead>
            <TableHead className='text-center w-[200px]'>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 &&
            courses.map((course) => (
              <TableRow key={course.slug}>
                <TableCell width={500}>
                  <div className='flex items-center gap-3 h-[90px] min-w-[350px]'>
                    <Image
                      src={course.image || imageNotFound}
                      alt='Image course'
                      width={1920}
                      height={1280}
                      className='shrink-0 w-[100px] h-full size-20 rounded-lg object-contain'
                    />
                    <div className='flex flex-col gap-1'>
                      <h2 className='font-bold lg:text-base line-clamp-1'>
                        {course.title}
                      </h2>
                      <p className='text-gray-66 text-xs lg:text-sm  line-clamp-1'>
                        {new Date(course.created_at).toLocaleDateString(
                          'vi-VI'
                        )}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  width={200}
                  className='text-center'
                >
                  <span className='line-clamp-1 text-red-f3 font-semibold'>
                    {course.price.toLocaleString('vi-VI')}đ
                  </span>
                </TableCell>
                <TableCell
                  width={200}
                  className='text-center'
                >
                  <button
                    type='button'
                    onClick={() =>
                      handleChangeStatus(course.slug, course.status)
                    }
                    className={cn(
                      courseStatus.find((item) => item.value === course.status)
                        ?.className,
                      'border border-current px-2 py-1 w-[100px] rounded-md font-semibold bg-white'
                    )}
                  >
                    {
                      courseStatus.find((item) => item.value === course.status)
                        ?.title
                    }
                  </button>
                </TableCell>
                <TableCell width={200}>
                  <div className='flex gap-3 items-center justify-center'>
                    <ButtonAction
                      url={`/manage/courses/update-content?slug=${course.slug}`}
                      icon={<IconBook />}
                    />
                    <ButtonAction
                      url={`/course/${course.slug}`}
                      icon={<IconEyeLine />}
                    />
                    <ButtonAction
                      url={`/manage/courses/update?slug=${course.slug}`}
                      icon={<IconPencil />}
                    />
                    <button
                      type='button'
                      onClick={() => handleDeleteCourse(course.slug)}
                      className='size-8 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-2'
                    >
                      <IconTrash />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className='flex items-center justify-end gap-3 mt-5 mb-[120px] lg:mb-[40px]'>
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

export default CourseManage;
