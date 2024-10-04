import { ICourse } from '@/database/course.model';

// Other
export interface IActiveLinkProps {
  url: string;
  children: React.ReactNode;
}

export interface IMenu {
  url: string;
  title?: string;
  icon: React.ReactNode;
}

// user
export interface ICreateUserParams {
  clerkId: string;
  avatar?: string;
  username: string;
  email: string;
}

// Course
export interface ICreateCourseParams {
  title: string;
  slug: string;
}

export interface IUpdateCourseParams {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
}

export interface IUpdateCourseLecture {
  _id: string;
  title: string;
  lessons: ILesson[];
}

export interface ICourseUpdateContentParams extends Omit<ICourse, 'lectures'> {
  lectures: IUpdateCourseLecture[];
}

export interface IGetAllCourseParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface StudyCoursesProps extends Omit<ICourse, 'lectures'> {
  lectures: {
    lessons: {
      slug: string;
    }[];
  }[];
}

// Lecture
export interface ICreateLectureParams {
  course: string;
  title?: string;
  path?: string;
}

export interface IUpdateLectureParams {
  lectureId: string;
  updateData: {
    title?: string;
    _destroy?: boolean;
  };
  path?: string;
}

// Lesson
export interface ICreateLessonParams {
  lecture: string;
  course: string;
  title?: string;
  slug?: string;
  path?: string;
}

export interface IUpdateLessonParams {
  lessonId: string;
  updateData: {
    title?: string;
    slug?: string;
    duration?: number;
    video_url?: string;
    content?: string;
    _destroy?: boolean;
  };
  path?: string;
}

// Order
export interface ICreateOrderParams {
  code: string;
  user: string;
  course: string;
  price?: number;
}

export interface IOrderManageProps {
  _id: string;
  code: string;
  price: number;
  status: EOrderStatus;
  created_at?: string;
  course: {
    title: string;
  };
  user: {
    username: string;
  };
}
