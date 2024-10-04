'use server';

import Course, { ICourse } from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import Lesson from '@/database/lesson.model';
import { connectDB } from '@/lib/mongoose';
import {
  ICourseUpdateContentParams,
  ICreateCourseParams,
  IGetAllCourseParams,
  IUpdateCourseParams
} from '@/types';
import { ECourseStatus } from '@/types/enums';
import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';

// Get all courses approved status (Home)
export async function getAllCoursesPublic(
  params: IGetAllCourseParams
): Promise<ICourse[] | undefined> {
  try {
    connectDB();
    const query: FilterQuery<typeof Course> = {};
    query.status = ECourseStatus.APPROVED;
    const courses = await Course.find(query).sort({ created_at: -1 });
    return courses;
  } catch (error) {
    console.log(error);
  }
}

// Get all courses
export async function getAllCourse(
  params: IGetAllCourseParams
): Promise<ICourse[] | undefined> {
  try {
    connectDB();
    const { page = 1, limit = 5, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: 'i' } }];
    }
    if (status) {
      query.status = status;
    }
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    return courses;
  } catch (error) {
    console.log(error);
  }
}

// Get course by slug
export async function getCourseBySlug({
  slug
}: {
  slug: string;
}): Promise<ICourseUpdateContentParams | undefined> {
  try {
    connectDB();
    const findCourse = await Course.findOne({ slug }).populate({
      path: 'lectures',
      model: Lecture,
      select: '_id title',
      match: {
        _destroy: false
      },
      populate: {
        path: 'lessons',
        model: Lesson,
        match: {
          _destroy: false
        }
      }
    });
    return findCourse;
  } catch (error) {
    console.log(error);
  }
}

// Create a course
export async function createCourse(params: ICreateCourseParams) {
  try {
    connectDB();
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course))
    };
  } catch (error) {
    console.log(error);
  }
}

// Update a course
export async function updateCourse(params: IUpdateCourseParams) {
  try {
    connectDB();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return undefined;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true
    });
    revalidatePath(params.path || '/');
    return {
      success: true,
      message: 'Cập nhật khóa học thành công.'
    };
  } catch (error) {
    console.log(error);
  }
}
