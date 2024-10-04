import { IconPlay } from '@/assets/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { IUpdateCourseLecture } from '@/types';
import Link from 'next/link';

const LessonContent = ({
  lectures,
  course,
  lessonDetails
}: {
  lectures: IUpdateCourseLecture[];
  course: string;
  lessonDetails: {
    slug: string;
  };
}) => {
  const currentLectureId = lectures
    .find((lecture) =>
      lecture.lessons.some((lesson) => lesson.slug === lessonDetails.slug)
    )
    ?._id.toString();

  return (
    <div className='lesson xl:fixed top-0 right-0 bottom-0 z-10 xl:max-w-[420px] w-full xl:mt-[calc(var(--header-height)+20px)] overflow-y-auto xl:pr-[30px]'>
      {lectures.length > 0 &&
        lectures.map((lecture: IUpdateCourseLecture) => (
          <Accordion
            key={lecture._id}
            type='single'
            collapsible
            defaultValue={
              lecture._id.toString() === currentLectureId
                ? lecture._id.toString()
                : ''
            }
          >
            <AccordionItem value={lecture._id.toString()}>
              <AccordionTrigger className='px-3'>
                <div className='flex items-center'>
                  <span>{lecture.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className='mt-3 mx-6 flex flex-col gap-5'>
                {lecture.lessons.map((lesson) => (
                  <Link
                    key={lesson._id}
                    href={`/${course}/lesson?slug=${lesson.slug}`}
                    className={`flex items-center justify-between gap-5 hover:text-primary transition-all ${
                      lessonDetails.slug === lesson.slug
                        ? 'pointer-events-none text-primary'
                        : ''
                    }`}
                  >
                    <div className='flex items-center gap-3 flex-1'>
                      <IconPlay className='size-4 shrink-0 text-primary' />
                      <h4 className='line-clamp-1'>{lesson.title}</h4>
                    </div>
                    <span className=''>{lesson.duration} phút</span>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
};

export default LessonContent;
