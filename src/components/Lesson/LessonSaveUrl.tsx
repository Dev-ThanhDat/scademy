'use client';

import { useEffect } from 'react';

const LessonSaveUrl = ({ url, course }: { url: string; course: string }) => {
  useEffect(() => {
    let results: any[] =
      JSON.parse(localStorage?.getItem('lastLesson') || '[]') || [];
    const item = {
      course,
      lesson: url
    };
    results = results.filter((el) => el.course !== course);
    results.push(item);
    localStorage?.setItem('lastLesson', JSON.stringify(results));
  }, [course, url]);
  return null;
};

export default LessonSaveUrl;
