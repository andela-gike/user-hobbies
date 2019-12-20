import mongoose from 'mongoose';
import init from '../../../server';

describe('API Request', () => {

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

  test('should success with server connection', async () => {
    const options = {
        method: 'GET',
        url: '/'
    };
    const data = await init.inject(options);
    expect(data.statusCode).toBe(302);
  });

  test('should send user to api doc', async () => {
    const options = {
        method: 'GET',
        url: '/api/v1'
    };
    const data = await init.inject(options);
    expect(data.statusCode).toBe(302);
  });
});
