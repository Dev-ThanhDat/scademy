import { EOrderStatus } from '@/types/enums';
import { Document, Schema, model, models } from 'mongoose';

export interface IOrder extends Document {
  _id: string;
  code: string;
  course: Schema.Types.ObjectId;
  price: number;
  user: Schema.Types.ObjectId;
  status: EOrderStatus;
  created_at: Date;
}

const orderSchema = new Schema<IOrder>({
  code: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: Object.values(EOrderStatus),
    default: EOrderStatus.PENDING
  }
});

const Order = models.Order || model<IOrder>('Order', orderSchema);
export default Order;
