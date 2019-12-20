import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/user-hobbies';

export async function connectDb(): Promise<void> {
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (e) {
    console.log('Failed to connect to MongoDB', e)
  }

  const db = mongoose.connection;
  // When the connection is connected
  db.on('connected', () => {
    console.log('Successfully connected to the database');
  });
  // When the connection is disconnected
  db.on('disconnected', () => {
    console.log(' Mongodb database is not connected. Exiting now...');
  });
}
