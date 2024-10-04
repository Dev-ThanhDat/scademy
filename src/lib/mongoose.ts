'use server';

import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectDB = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error('MongoDb URL is not set.');
  }
  if (isConnected) {
    console.log('Mongodb is already connected.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log('Connect mongodb successfully.');
  } catch {
    console.log('Error while connecting to mongodb.');
  }
};
