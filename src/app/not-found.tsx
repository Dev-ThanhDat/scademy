import notFound from '@/assets/images/not-found.jpg';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className='flex flex-col items-center justify-center gap-6 h-[calc(100vh-60px-var(--header-height))] p-5'>
      <Image
        src={notFound}
        alt='Not found image'
        className='lg:w-[400px] w-[250px]'
      />
      <h1 className='font-extrabold md:text-[45px] text-[35px] text-center leading-[1.4]'>
        Không tìm thấy nội dung &#128531;
      </h1>
      <ul className='text-center'>
        <li className='font-bold md:leading-[1.6] leading-[1.4] text-center '>
          URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.
        </li>
        <li className='font-bold md:leading-[1.6] leading-[1.4] text-center '>
          Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì
          dùng URL đã lưu.
        </li>
      </ul>
      <Link
        href='/'
        className='text-white bg-secondary border border-secondary hover:bg-white hover:text-secondary transition-all py-2 px-4 rounded-full uppercase font-bold'
      >
        Về trang chủ
      </Link>
    </section>
  );
}
