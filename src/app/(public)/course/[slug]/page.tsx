import NotFound from '@/app/not-found';
import {
  IconBattery,
  IconBolt,
  IconCheck,
  IconCommand,
  IconPlay
} from '@/assets/icons';
import ButtonEnroll from '@/components/Common/ButtonEnroll';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { getCourseBySlug } from '@/lib/actions/course.action';
import { getUserInfo } from '@/lib/actions/user.actions';
import { IUpdateCourseLecture } from '@/types';
import { ECourseStatus } from '@/types/enums';
import { courseLevelTitle } from '@/utils/courseLevel';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Detail Course'
};

const Course = async ({
  params
}: {
  params: {
    slug: string;
  };
}) => {
  const data = await getCourseBySlug({
    slug: params.slug
  });
  if (!data) return null;
  if (data.status !== ECourseStatus.APPROVED) return <NotFound />;
  const { userId } = auth();
  const findUser = await getUserInfo({ userId: userId || '' });
  const userCourses = findUser?.courses.map((c) => c.toString());
  const videoId = data.intro_url?.split('v=')[1];
  const lectures = data.lectures || [];

  return (
    <section className='grid lg:grid-cols-[2fr,1fr] lg:px-[30px] gap-12 h-full mb-[85px] lg:mb-0'>
      <div className='flex flex-col lg:gap-[50px] gap-[25px] lg:mt-5 order-2 lg:order-none'>
        <div>
          <h1 className='lg:text-[32px] text-[25px] mb-4 font-black'>
            {data.title}
          </h1>
          <p>{data.desc}</p>
        </div>
        {data.info.benefits.length > 0 && (
          <div>
            <h2 className='text-xl font-bold'>Bạn sẽ học được gì?</h2>
            <ul className='mt-3 grid md:grid-cols-2 grid-cols-1 gap-6'>
              {data.info.benefits.length > 0 &&
                data.info.benefits.map((item, index) => (
                  <BoxInfo
                    key={index}
                    title={item}
                    icon={<IconCheck className='size-[15px] text-primary' />}
                  />
                ))}
            </ul>
          </div>
        )}
        {lectures.length > 0 && (
          <div>
            <h2 className='text-xl font-bold'>Nội dung khóa học</h2>
            <div className='mt-5'>
              {lectures.length > 0 &&
                lectures.map((lecture: IUpdateCourseLecture) => (
                  <Accordion
                    key={lecture._id}
                    type='single'
                    collapsible
                  >
                    <AccordionItem value={lecture._id.toString()}>
                      <AccordionTrigger className='px-3'>
                        <div className='flex items-center justify-between flex-1 gap-5 pr-5'>
                          <span className='line-clamp-1'>{lecture.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className='mt-3 mx-6 flex flex-col gap-5'>
                        {lecture.lessons.map((lesson) => (
                          <div
                            key={lesson._id}
                            className='flex items-center justify-between gap-5'
                          >
                            <div className='flex items-center gap-3 flex-1'>
                              <IconPlay className='size-4 shrink-0 text-primary' />
                              <h4 className='line-clamp-1'>{lesson.title}</h4>
                            </div>
                            <span className=''>{lesson.duration} phút</span>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
            </div>
          </div>
        )}
        {data.info.requirements.length > 0 && (
          <div>
            <h2 className='text-xl font-bold'>Yêu cầu</h2>
            <ul className='mt-3 grid grid-cols-1 gap-6'>
              {data.info.requirements.length > 0 &&
                data.info.requirements.map((item, index) => (
                  <BoxInfo
                    key={index}
                    title={item}
                    icon={<IconBolt className='size-[15px] text-primary' />}
                  />
                ))}
            </ul>
          </div>
        )}
        {data.info.qa.length > 0 && (
          <div>
            <h2 className='text-xl font-bold'>Q/A</h2>
            <ul className='mt-3 grid grid-cols-1 gap-3'>
              {data.info.qa.length > 0 &&
                data.info.qa.map((item, index) => (
                  <Accordion
                    key={index}
                    type='single'
                    collapsible
                  >
                    <AccordionItem value={item.question}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className='px-3'>
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div className='lg:mt-3 shrink-0 order-1 lg:order-none'>
        <div className='relative aspect-video mb-5 rounded-2xl overflow-hidden'>
          {data.intro_url ? (
            <iframe
              width={866}
              height={487}
              src={`https://www.youtube.com/embed/${videoId}`}
              title='Yêu Em 2 Ngày, Anh Đã Quên Được Em Rồi Baby!, Nắng Có Mang Em Về | Playlist GenZ THÁNG 10 Hot CHILL'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              className='w-full h-full object-fill'
            />
          ) : (
            <Image
              src={data.image}
              alt='Image course'
              fill
              className='w-full h-full object-cover'
            />
          )}
        </div>
        <h5 className='text-4xl text-primary text-center mb-4'>
          {data.price.toLocaleString('vi-VI')}đ
        </h5>
        <div className='text-center'>
          {userCourses?.includes(data._id.toString()) ? (
            <Link
              href='/study'
              className='bg-secondary text-white border border-secondary py-1 px-4 rounded-full min-w-[180px] font-bold  uppercase text-base hover:bg-white hover:text-secondary transition-all'
            >
              Khu vực học tập
            </Link>
          ) : (
            <ButtonEnroll
              user={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
              courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
              price={data.price}
            />
          )}
        </div>
        <ul className='mt-6 w-[200px] lg:mx-auto gap-[15px] flex flex-col'>
          <BoxSection
            title={`Trình độ ${courseLevelTitle[data.level]}`}
            icon={<IconCommand className='size-[15px]' />}
          />
          <BoxSection
            title='Học mọi lúc, mọi nơi'
            icon={<IconBattery className='size-[15px]' />}
          />
        </ul>
      </div>
    </section>
  );
};

function BoxInfo({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <li className='flex items-center gap-2'>
      <span>{icon}</span>
      <span>{title}</span>
    </li>
  );
}

function BoxSection({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <li className='flex items-center gap-3'>
      <span>{icon}</span>
      <span>{title}</span>
    </li>
  );
}

export default Course;
