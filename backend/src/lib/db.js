import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Kết nối thành công: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}