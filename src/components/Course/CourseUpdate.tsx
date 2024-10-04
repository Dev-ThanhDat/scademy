'use client';

import { IconAdd } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ICourse } from '@/database/course.model';
import { useToast } from '@/hooks/use-toast';
import { updateCourse } from '@/lib/actions/course.action';
import { ECourseLevel, ECourseStatus } from '@/types/enums';
import { courseLevel } from '@/utils/courseLevel';
import { courseStatus } from '@/utils/courseStatus';
import { UploadButton } from '@/utils/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useImmer } from 'use-immer';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(10, 'Tên khóa học phải có ít nhất 10 ký tự'),
  slug: z.string().optional(),
  price: z.number().int().positive().optional(),
  intro_url: z.string().optional(),
  desc: z.string().optional(),
  image: z.string().optional(),
  status: z
    .enum([
      ECourseStatus.APPROVED,
      ECourseStatus.PENDING,
      ECourseStatus.REJECTED
    ])
    .optional(),
  level: z
    .enum([
      ECourseLevel.BEGINNER,
      ECourseLevel.INTERMEDIATE,
      ECourseLevel.ADVANCED
    ])
    .optional(),
  info: z.object({
    requirements: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    qa: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional()
  })
});

const CourseUpdate = ({ data }: { data: ICourse }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: data.info.requirements,
    benefits: data.info.benefits,
    qa: data.info.qa
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      slug: data.slug,
      price: data.price,
      intro_url: data.intro_url,
      desc: data.desc,
      image: data.image,
      status: data.status,
      level: data.level,
      info: {
        requirements: data.info.requirements,
        benefits: data.info.benefits,
        qa: data.info.qa
      }
    }
  });

  const imageWatch = form.watch('image');

  //Update a course
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await updateCourse({
        slug: data.slug,
        updateData: {
          title: values.title,
          slug: values.slug,
          price: values.price,
          intro_url: values.intro_url,
          desc: values.desc,
          status: values.status,
          level: values.level,
          image: values.image,
          info: {
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qa: courseInfo.qa
          }
        }
      });
      if (values.slug !== data.slug) {
        router.replace(`/manage/courses/update?slug=${values.slug}`);
      }
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Cập nhật khóa học thành công.',
          duration: 1000
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <div className='lg:grid lg:grid-cols-2 flex flex-col gap-8 mt-10 mb-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khóa học *</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Tên khóa học'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn khóa học</FormLabel>
                <FormControl>
                  <Input
                    placeholder='khoa-hoc-lap-trinh'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá:</FormLabel>
                <FormControl>
                  <Input
                    placeholder='xxx.xxx.xxx'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='level'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trình độ:</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Trình độ' />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevel.length > 0 &&
                        courseLevel.map((item, index) => (
                          <SelectItem
                            key={index}
                            value={item.value}
                          >
                            {item.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='desc'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả khóa học:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Nhập mô tả...'
                    {...field}
                    className='min-h-[200px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={() => (
              <FormItem>
                <FormLabel>Ảnh đại diện:</FormLabel>
                <FormControl>
                  {!imageWatch ? (
                    <div className='flex flex-col items-center justify-center w-full p-5 max-h-[200px] h-full rounded-md border border-gray-e8e'>
                      <UploadButton
                        endpoint='imageUploader'
                        onClientUploadComplete={(res) => {
                          form.setValue('image', res[0].url);
                          toast({
                            variant: 'success',
                            title: 'Thêm ảnh thành công.',
                            duration: 1000
                          });
                        }}
                        onUploadError={(error: Error) => {
                          toast({
                            variant: 'error',
                            title: `Error! ${error.message}`,
                            duration: 1000
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full max-h-[400px] min-h-[200px] p-5 rounded-md border border-gray-e8e'>
                      <Image
                        src={imageWatch}
                        alt='Image course'
                        fill
                        className='object-contain p-5'
                      />
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='intro_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube URL:</FormLabel>
                <FormControl>
                  <Input
                    placeholder='https://www.youtube.com/watch?v=xxxxxx'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái:</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Trạng thái' />
                    </SelectTrigger>
                    <SelectContent>
                      {courseStatus.length > 0 &&
                        courseStatus.map((item, index) => (
                          <SelectItem
                            key={index}
                            value={item.value}
                          >
                            {item.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='info.requirements'
            render={() => (
              <FormItem>
                <FormLabel className='flex items-center justify-between gap-5 cursor-default'>
                  <span>Yêu cầu:</span>
                  <button
                    className='text-primary'
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.requirements.push('');
                      });
                    }}
                    type='button'
                  >
                    <IconAdd className='size-5' />
                  </button>
                </FormLabel>
                <FormControl>
                  <Fragment>
                    {courseInfo.requirements.map((item, index) => (
                      <Input
                        key={index}
                        placeholder={`Yêu cầu số ${index + 1}`}
                        value={item}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.requirements[index] = e.target.value;
                          });
                        }}
                      />
                    ))}
                  </Fragment>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='info.benefits'
            render={() => (
              <FormItem>
                <FormLabel className='flex items-center justify-between gap-5 cursor-default'>
                  <span>Lợi ích:</span>
                  <button
                    className='text-primary'
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.benefits.push('');
                      });
                    }}
                    type='button'
                  >
                    <IconAdd className='size-5' />
                  </button>
                </FormLabel>
                <FormControl>
                  <Fragment>
                    {courseInfo.benefits.map((item, index) => (
                      <Input
                        key={index}
                        placeholder={`Lợi ích số ${index + 1}`}
                        value={item}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.benefits[index] = e.target.value;
                          });
                        }}
                      />
                    ))}
                  </Fragment>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='info.qa'
            render={() => (
              <FormItem className='col-start-1 col-end-3'>
                <FormLabel className='flex items-center justify-between gap-5 cursor-default'>
                  <span>Q/A:</span>
                  <button
                    className='text-primary'
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.qa.push({
                          question: '',
                          answer: ''
                        });
                      });
                    }}
                    type='button'
                  >
                    <IconAdd className='size-5' />
                  </button>
                </FormLabel>
                <FormControl>
                  <Fragment>
                    {courseInfo.qa.map((item, index) => (
                      <div
                        className='grid grid-cols-2 gap-5'
                        key={index}
                      >
                        <Input
                          key={index + 'a'}
                          placeholder={`Câu hỏi số ${index + 1}`}
                          value={item.question}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.qa[index].question = e.target.value;
                            });
                          }}
                        />
                        <Input
                          key={index + 'b'}
                          placeholder={`Câu trả lời số ${index + 1}`}
                          value={item.answer}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.qa[index].answer = e.target.value;
                            });
                          }}
                        />
                      </div>
                    ))}
                  </Fragment>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type='submit'
          isLoading={isSubmitting}
          className='w-[176px]'
          disabled={isSubmitting}
        >
          Cập nhật khóa học
        </Button>
      </form>
    </Form>
  );
};

export default CourseUpdate;
