'use server';

import Course from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import Lesson, { ILesson } from '@/database/lesson.model';
import { connectDB } from '@/lib/mongoose';
import { ICreateLessonParams, IUpdateLessonParams } from '@/types';
import { revalidatePath } from 'next/cache';

// Get lesson by slug
export async function getLessonBySlug({
  slug,
  course
}: {
  slug: string;
  course: string;
}): Promise<ILesson | undefined> {
  try {
    connectDB();
    const findLesson = await Lesson.findOne({
      slug,
      course
    }).select('title video_url content');
    return findLesson;
  } catch (error) {
    console.log(error);
  }
}

// Find all lessons
export async function findAllLessons({
  course
}: {
  course: string;
}): Promise<ILesson[] | undefined> {
  try {
    connectDB();
    const lessons = await Lesson.find({
      course
    }).select('title video_url content slug');
    return lessons;
  } catch (error) {
    console.log(error);
  }
}

// Create a lesson
export async function createLesson(params: ICreateLessonParams) {
  try {
    connectDB();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const findLecture = await Lecture.findById(params.lecture);
    if (!findLecture) return;
    const newLesson = await Lesson.create(params);
    findLecture.lessons.push(newLesson._id);
    await findLecture.save();
    revalidatePath(params.path || '/');
    if (!newLesson) return;
    return {
      success: true
    };
  } catch (error) {
    console.log(error);
  }
}

// Update a lesson
export async function updateLesson(params: IUpdateLessonParams) {
  try {
    connectDB();
    const response = await Lesson.findByIdAndUpdate(
      params.lessonId,
      params.updateData,
      { new: true }
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
