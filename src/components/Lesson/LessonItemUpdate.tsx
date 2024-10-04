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
import { Textarea } from '@/components/ui/textarea';
import { ILesson } from '@/database/lesson.model';
import { useToast } from '@/hooks/use-toast';
import { updateLesson } from '@/lib/actions/lesson.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional()
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug,
      duration: lesson.duration,
      video_url: lesson.video_url,
      content: lesson.content
    }
  });

  // Update a lesson
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await updateLesson({
        lessonId: lesson._id,
        updateData: {
          slug: values.slug,
          duration: values.duration,
          video_url: values.video_url,
          content: values.content
        }
      });
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Cập nhật bài học thành công.',
          duration: 1000
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <div className='lg:grid lg:grid-cols-2 flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đường dẫn: </FormLabel>
                  <FormControl>
                    <Input
                      className='w-full'
                      placeholder='bai-1-tong-quan'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='duration'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời lượng:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='00'
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
              name='video_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL:</FormLabel>
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
          </div>
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Nhập nội dung...'
                    {...field}
                    className='h-[200px] resize-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-end gap-5 items-center mt-2'>
          <Button type='submit'>Cập nhật</Button>
        </div>
      </form>
    </Form>
  );
};

export default LessonItemUpdate;
