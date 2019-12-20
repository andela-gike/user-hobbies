import mongoose from 'mongoose';
import init from '../../../server';
import Hobby from '../../models/hobbyModel';
import User from '../../models/userModel';

describe('Hobbies controller', () => {
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

  test('should add, get and delete hobbies successfully', async () => {
    const userName = 'Test user';
    const testUser = await new User({ name: userName }).save();
    expect(testUser).toHaveProperty('_id');
    const userId = testUser['_id'];

    // add hobby
    const payload = {
      name: 'Jogging',
      passionLevel: 'High',
      user: userId,
      year: 2003,
    };
    const testHobby = await new Hobby(payload).save();
    expect(testHobby).toHaveProperty('_id');
    expect(testHobby).toHaveProperty('user');

    // delete hobby
    const hobbyId = testHobby['_id'];
    const deleteTestHobby: any = await Hobby.findByIdAndDelete(hobbyId);
    expect(deleteTestHobby['_id'].toString()).toEqual(hobbyId.toString());
  });
});
