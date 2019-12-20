import mongoose from 'mongoose';
import init from '../../../server';

describe('Hobbies API Request', () => {

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

  test('should create, get , update and delete hobbies successfully', async () => {
    const userName = 'Test user with hobby'
    const hobbyName = 'Playing games'
    const options = {
        method: 'POST',
        payload: JSON.stringify({ name: userName }),
        url: '/api/v1/users'
    };
    let data = await init.inject(options);
    expect(data.statusCode).toBe(200);
    const userId = data.result['_id'];

    data = await init.inject({
      method: 'POST',
      payload:
      JSON.stringify({
        name: hobbyName,
        passionLevel: 'High',
        userId,
        year: 2018, }),
      url: '/api/v1/hobbies'
    });
    expect(data.statusCode).toBe(200);
    expect(data.result['name']).toBe(hobbyName);

    const hobbyId = data.result['_id'];
    data = await init.inject({
      method: 'PUT',
      payload:
      JSON.stringify({
        passionLevel: 'Low',
        year: 2004,
      }),
      url: `/api/v1/hobbies/${hobbyId}`,
    })
    expect(data.statusCode).toBe(200);

    const getOptions = {
        method: 'GET',
        url: `/api/v1/hobbies/${hobbyId}`
    };
    data = await init.inject(getOptions);
    expect(data.statusCode).toBe(200);

    data = await init.inject({
      method: 'DELETE',
      url: `/api/v1/hobbies/${hobbyId}`
    })
    expect(data.statusCode).toBe(200);
  });

});
