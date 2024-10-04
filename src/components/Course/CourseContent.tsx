'use client';

import { IconCheck, IconClose, IconPencil, IconTrash } from '@/assets/icons';
import LessonItemUpdate from '@/components/Lesson/LessonItemUpdate';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { createLecture, updateLecture } from '@/lib/actions/lectures.action';
import { createLesson, updateLesson } from '@/lib/actions/lesson.actions';
import { ICourseUpdateContentParams, IUpdateCourseLecture } from '@/types';
import { Fragment, MouseEvent, useState } from 'react';
import slugify from 'slugify';
import Swal from 'sweetalert2';

const CourseContent = ({ course }: { course: ICourseUpdateContentParams }) => {
  const lectures = course.lectures;
  const { toast } = useToast();
  const [lectureEdit, setLectureEdit] = useState('');
  const [lectureIdEdit, setLectureIdEdit] = useState('');
  const [lessonEdit, setLessonEdit] = useState('');
  const [lessonIdEdit, setLessonIdEdit] = useState('');

  // Add new a lecture
  const handleAddNewLecture = async () => {
    try {
      const response = await createLecture({
        title: 'Chương mới',
        course: course._id,
        path: `/manage/course/update-content?slug=${course.slug}`
      });
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Thêm chương mới thành công.',
          duration: 1000
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a lecture
  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      Swal.fire({
        title: 'Bạn chắc chứ?',
        text: 'Bạn có muốn xóa chương không!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa!',
        cancelButtonText: 'Không'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateLecture({
            lectureId,
            updateData: {
              _destroy: true
            },
            path: `/manage/course/update-content?slug=${course.slug}`
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Update a lecture
  const handleUpdateLecture = async (lectureId: string) => {
    try {
      const response = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit
        },
        path: `/manage/course/update-content?slug=${course.slug}`
      });
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Cập nhât chương thành công.',
          duration: 1000
        });
        setLectureIdEdit('');
        setLectureEdit('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add new a lesson
  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const response = await createLesson({
        lecture: lectureId,
        course: courseId,
        title: 'Tiêu đề bài học mới',
        slug: `tieu-de-bai-hoc-moi-${new Date()
          .getTime()
          .toString()
          .slice(-3)}`,
        path: `/manage/course/update-content?slug=${course.slug}`
      });
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Thêm bài học mới thành công.',
          duration: 1000
        });
        return;
      }
      toast({
        variant: 'destructive',
        title: 'Thêm bài học mới thất bại.',
        duration: 1000
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Update a lesson
  const handleUpdateLesson = async (lessonId: string) => {
    try {
      const response = await updateLesson({
        lessonId,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: 'vi',
            remove: /[*+~.()'"!,?#%^&:@]/g
          })
        },
        path: `/manage/course/update-content?slug=${course.slug}`
      });
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Cập nhât bài học thành công.',
          duration: 1000
        });
        setLessonIdEdit('');
        setLessonEdit('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a lesson
  const handleDeleteLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string
  ) => {
    e.stopPropagation();
    try {
      const response = await updateLesson({
        lessonId,
        updateData: {
          _destroy: true
        },
        path: `/manage/course/update-content?slug=${course.slug}`
      });
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Xóa bài học thành công.',
          duration: 1000
        });
        setLessonIdEdit('');
        setLessonEdit('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='mb-5 lg:px-[60px] flex flex-col gap-5'>
        {lectures.length > 0 &&
          lectures.map((lecture: IUpdateCourseLecture) => (
            <div
              key={lecture._id}
              className='flex flex-col gap-2'
            >
              <Accordion
                type='single'
                collapsible={!lectureIdEdit}
              >
                <AccordionItem value={lecture._id}>
                  <AccordionTrigger>
                    <div className='flex items-center justify-between flex-1 gap-5 pr-5 text-xl'>
                      {lecture._id === lectureIdEdit ? (
                        <Fragment>
                          <div
                            className='w-full'
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Input
                              placeholder='Tên chương...'
                              className='w-full'
                              defaultValue={lecture.title}
                              onChange={(e) => setLectureEdit(e.target.value)}
                            />
                          </div>
                          <div className='flex items-center gap-2'>
                            <span
                              onClick={() => handleUpdateLecture(lecture._id)}
                              className='size-8 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-2'
                            >
                              <IconCheck />
                            </span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setLectureIdEdit('');
                              }}
                              className='size-8 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-2'
                            >
                              <IconClose />
                            </span>
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <span>{lecture.title}</span>
                          <div className='flex items-center gap-2'>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setLectureIdEdit(lecture._id);
                              }}
                              className='size-8 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-2'
                            >
                              <IconPencil />
                            </span>
                            <span
                              onClick={(e) =>
                                handleDeleteLecture(e, lecture._id)
                              }
                              className='size-8 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-2'
                            >
                              <IconTrash />
                            </span>
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='mt-3 mx-6'>
                    <div className='flex flex-col gap-4'>
                      {lecture.lessons.map((lesson) => (
                        <div key={lesson._id}>
                          <Accordion
                            type='single'
                            collapsible={!lessonIdEdit}
                          >
                            <AccordionItem value={lesson._id}>
                              <AccordionTrigger>
                                <div className='flex items-center justify-between flex-1 gap-5 pr-5 '>
                                  {lesson._id === lessonIdEdit ? (
                                    <Fragment>
                                      <div
                                        className='w-full'
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Input
                                          placeholder='Tên chương...'
                                          className='w-full'
                                          defaultValue={lesson.title}
                                          onChange={(e) =>
                                            setLessonEdit(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className='flex items-center gap-2'>
                                        <span
                                          onClick={() =>
                                            handleUpdateLesson(lesson._id)
                                          }
                                          className='size-6 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-1'
                                        >
                                          <IconCheck />
                                        </span>
                                        <span
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setLessonIdEdit('');
                                          }}
                                          className='size-6 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-1'
                                        >
                                          <IconClose />
                                        </span>
                                      </div>
                                    </Fragment>
                                  ) : (
                                    <Fragment>
                                      <span>{lesson.title}</span>
                                      <div className='flex items-center gap-2'>
                                        <span
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setLessonIdEdit(lesson._id);
                                          }}
                                          className='size-6 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-1'
                                        >
                                          <IconPencil />
                                        </span>
                                        <span
                                          onClick={(e) =>
                                            handleDeleteLesson(e, lesson._id)
                                          }
                                          className='size-6 rounded-md border border-secondary hover:opacity-75 transition-all flex items-center justify-center p-1'
                                        >
                                          <IconTrash />
                                        </span>
                                      </div>
                                    </Fragment>
                                  )}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className='mt-3 lg:mx-6'>
                                <LessonItemUpdate lesson={lesson} />
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button
                onClick={() => handleAddNewLesson(lecture._id, course._id)}
                className='ml-auto w-fit block'
              >
                Thêm bài học
              </Button>
            </div>
          ))}
      </div>
      <Button
        onClick={handleAddNewLecture}
        type='submit'
      >
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseContent;
