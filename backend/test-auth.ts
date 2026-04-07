import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from './src/models/User.js';

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ DB connected');

    // Try to create a user
    const user = await User.create({ name: 'Test User', email: 'testuser@aura.com', password: 'Test123456' });
    console.log('✅ User created:', JSON.stringify({ id: user._id, name: user.name, email: user.email }));

    // Try to find and compare password
    const found = await User.findOne({ email: 'testuser@aura.com' });
    if (found) {
      const match = await found.comparePassword('Test123456');
      console.log('✅ Password compare result:', match);
    }

    // Clean up
    await User.deleteOne({ email: 'testuser@aura.com' });
    console.log('✅ Test user cleaned up');
  } catch (e: any) {
    console.error('❌ ERROR:', e.message);
    console.error('Stack:', e.stack);
  } finally {
    await mongoose.disconnect();
    console.log('Done');
  }
}

test();
