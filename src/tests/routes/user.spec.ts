import * as Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import init from '../../../server';

describe('User API Request', () => {

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

  test('should get all users successfully', async () => {
    const options = {
        method: 'GET',
        url: '/api/v1/users'
    };
    const data = await init.inject(options);
    expect(data.statusCode).toBe(200);
  });

  test('should add user successfully', async () => {
    const userName = 'Test user'
    const options = {
        method: 'POST',
        payload: JSON.stringify({ name: userName }),
        url: '/api/v1/users'
    };
    const data: Hapi.ServerInjectResponse | any = await init.inject(options);
    expect(data.statusCode).toBe(200);
    expect(data.result['name']).toBe(userName);
  });

  test('should update user successfully', async () => {
    const userName = 'Test user update'
    const newName = 'New user name'
    const options = {
        method: 'POST',
        payload: JSON.stringify({ name: userName }),
        url: '/api/v1/users'
    };
    let data: Hapi.ServerInjectResponse | any = await init.inject(options);
    expect(data.statusCode).toBe(200);
    const userId = data.result['_id'];
    // update user with no value
    data = await init.inject({
      method: 'PUT',
      payload: JSON.stringify({}),
      url: `/api/v1/users/${userId}`
    });
    expect(data.statusCode).toBe(200);

    // update user name
    data = await init.inject({
      method: 'PUT',
      payload: JSON.stringify({ name: newName }),
      url: `/api/v1/users/${userId}`
    });
    expect(data.statusCode).toBe(200);
    expect(data.result['name']).toBe(newName);
  });

  test('should get and delete user successfully', async () => {
    const userName = 'Test user Delete'
    const options = {
        method: 'POST',
        payload: JSON.stringify({ name: userName }),
        url: '/api/v1/users'
    };
    let data: Hapi.ServerInjectResponse | any = await init.inject(options);
    expect(data.statusCode).toBe(200);
    const userId = data.result['_id'];

    data = await init.inject({
      method: 'GET',
      url: `/api/v1/users/${userId}`,
    });

    expect(data.statusCode).toBe(200);

    data = await init.inject({
      method: 'DELETE',
      url: `/api/v1/users/${userId}`,
    });

    expect(data.statusCode).toBe(200);
  });

  test('should get user hobbies', async () => {
    const userName = 'Test user hobbies'
    const options = {
        method: 'POST',
        payload: JSON.stringify({ name: userName }),
        url: '/api/v1/users'
    };
    const data: Hapi.ServerInjectResponse | any = await init.inject(options);
    expect(data.statusCode).toBe(200);
    const userId = data.result['_id'];

    const hobbyOption = {
      name: 'Knitting',
      passionLevel: 'High',
      userId,
      year: 2018,
    }
    let hobbyData = await init.inject({
      method: 'POST',
      payload: JSON.stringify(hobbyOption),
      url: '/api/v1/hobbies'
    });
    expect(hobbyData.statusCode).toBe(200);

    hobbyData = await init.inject({
      method: 'GET',
      url: `/api/v1/users/${userId}/hobbies`
    })
    expect(hobbyData.statusCode).toBe(200);
  });

});
