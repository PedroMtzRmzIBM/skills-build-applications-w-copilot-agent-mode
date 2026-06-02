import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function connectDatabase(): Promise<typeof mongoose> {
  // Keep defaults but expose the URI and connection setup in one place
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(MONGODB_URI);
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    return mongoose;
  } catch (err) {
    console.error('MongoDB initial connection error:', (err as any)?.message ?? String(err));
    throw err;
  }
}

export { connectDatabase, MONGODB_URI };
export default connectDatabase;
