'use server';

import Course, { ICourse } from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import Lesson from '@/database/lesson.model';
import User, { IUser } from '@/database/user.model';
import { connectDB } from '@/lib/mongoose';
import { ICreateUserParams } from '@/types';
import { ECourseStatus } from '@/types/enums';
import { auth } from '@clerk/nextjs/server';

// Get info a user
export async function getUserInfo({
  userId
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    connectDB();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return null;
    return findUser;
  } catch (error) {
    console.log(error);
  }
}

// Get course of user
export async function getUserCourses(): Promise<ICourse[] | undefined | null> {
  try {
    connectDB();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: 'courses',
      model: Course,
      match: {
        status: ECourseStatus.APPROVED
      },
      populate: {
        path: 'lectures',
        model: Lecture,
        select: 'lessons',
        populate: {
          path: 'lessons',
          model: Lesson,
          select: 'slug'
        }
      }
    });
    if (!findUser) return null;
    return findUser.courses;
  } catch (error) {
    console.log(error);
  }
}

// Create user
export async function createUser(params: ICreateUserParams) {
  try {
    connectDB();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
