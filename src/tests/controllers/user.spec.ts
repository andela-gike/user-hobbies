import mongoose from 'mongoose';
import init from '../../../server';
import User from '../../models/userModel';

describe('User controller', () => {
  beforeAll(async (done) => {
    await init.events.on('start', () => {
      done();
    });
  });

  afterAll(async (done) => {
    await init.events.on('stop', () => {
      done();
    });
    await mongoose.connection.close();
    init.stop();
    done();
  });

  test('should add user successfully', async () => {
    const userName = 'Test user';
    const testUser = await new User({ name: userName }).save();
    expect(testUser).toHaveProperty('name');
    expect(testUser).toHaveProperty('_id');
    expect(testUser).toHaveProperty('created_at');
  });

  test('should get user successfully', async () => {
    const userName = 'Test user Update';
    const testUser = await new User({ name: userName }).save();
    expect(testUser).toHaveProperty('name');
    const userId = testUser['_id'];
    const getUser = await User.findById(userId);
    expect(getUser).toHaveProperty('name', userName);
  });
});
