import { ECourseLevel, ECourseStatus } from '@/types/enums';
import { Document, Schema, model, models } from 'mongoose';

export interface ICourse extends Document {
  _id: string;
  title: string;
  image: string;
  intro_url: string;
  desc: string;
  price: number;
  slug: string;
  status: ECourseStatus;
  created_at: Date;
  author: Schema.Types.ObjectId;
  level: ECourseLevel;
  info: {
    requirements: string[];
    benefits: string[];
    qa: {
      question: string;
      answer: string;
    }[];
  };
  lectures: Schema.Types.ObjectId[];
  _destroy: boolean;
}

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  intro_url: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  slug: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(ECourseStatus),
    default: ECourseStatus.PENDING
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  level: {
    type: String,
    enum: Object.values(ECourseLevel),
    default: ECourseLevel.BEGINNER
  },
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lecture'
    }
  ],
  info: {
    requirements: {
      type: [String]
    },
    benefits: {
      type: [String]
    },
    qa: [
      {
        question: {
          type: String
        },
        answer: {
          type: String
        }
      }
    ]
  },
  _destroy: {
    type: Boolean,
    default: false
  }
});

const Course = models.Course || model<ICourse>('Course', courseSchema);
export default Course;