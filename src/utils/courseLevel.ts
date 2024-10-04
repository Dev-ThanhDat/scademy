import { ECourseLevel } from '@/types/enums';

export const courseLevel: {
  title: string;
  value: ECourseLevel;
}[] = [
  {
    title: 'Cơ bản',
    value: ECourseLevel.BEGINNER
  },
  {
    title: 'Trung bình',
    value: ECourseLevel.INTERMEDIATE
  },
  {
    title: 'Nâng cao',
    value: ECourseLevel.ADVANCED
  }
];

export const courseLevelTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: 'cơ bản',
  [ECourseLevel.INTERMEDIATE]: 'trung bình',
  [ECourseLevel.ADVANCED]: 'nâng cao'
};
