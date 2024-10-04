'use client';

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
import { IUser } from '@/database/user.model';
import { useToast } from '@/hooks/use-toast';
import { createCourse } from '@/lib/actions/course.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(10, 'Tên khóa học phải có ít nhất 10 ký tự!'),
  slug: z.string().optional()
});

const CourseAddNew = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: ''
    }
  });

  // Add a course
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            lower: true,
            locale: 'vi',
            remove: /[*+~.()'"!,?#%^&:@]/g
          }),
        author: user._id
      };
      const response = await createCourse(data);
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Tạo khóa học thành công.',
          duration: 1000
        });
        setIsSubmitting(false);
        form.reset();
      }
      if (response?.data) {
        router.push(`/manage/courses/update?slug=${response.data.slug}`);
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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 mb-8'>
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
        </div>
        <Button
          type='submit'
          isLoading={isSubmitting}
          className='lg:w-[135px] w-full'
          disabled={isSubmitting}
        >
          Tạo khóa học
        </Button>
      </form>
    </Form>
  );
};

export default CourseAddNew;
