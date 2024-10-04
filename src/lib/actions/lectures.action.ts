'use server';

import Course from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import { connectDB } from '@/lib/mongoose';
import { ICreateLectureParams, IUpdateLectureParams } from '@/types';
import { revalidatePath } from 'next/cache';

// Create a lecture
export async function createLecture(params: ICreateLectureParams) {
  try {
    connectDB();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || '/');
    return {
      success: true
    };
  } catch (error) {
    console.log(error);
  }
}

// update a lecture
export async function updateLecture(params: IUpdateLectureParams) {
  try {
    connectDB();
    const response = await Lecture.findByIdAndUpdate(
      params.lectureId,
      params.updateData,
      {
        new: true
      }
    );
    revalidatePath(params.path || '/');
    if (!response) return;
    return {
      success: true
    };
  } catch (error) {
    console.log(error);
  }
}
