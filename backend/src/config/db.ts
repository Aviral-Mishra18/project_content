import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      console.error('❌ ERROR: MONGODB_URI is not defined in your .env file.');
      process.exit(1);
    }

    const conn = await mongoose.connect(uri.trim(), {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('⚠️  Server will continue running but DB operations will fail.');
    console.error('   Check your MONGODB_URI and network connectivity.');
  }
};

export default connectDB;
