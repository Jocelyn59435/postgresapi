import supertest from 'supertest';
import app from '../server';
import { store } from '../handlers/users';
import { User } from '../models/user';

const request = supertest(app);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJmaXJzdG5hbWUiOiJaaXlpbiIsImxhc3RuYW1lIjoiWWFuZyIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkQXpUaU5ZYWR5U1dTOW5vOEVucGhULjJpSHJSNTQxWVNuQkhvakhVYTZvWUl0UmRjVnJrLy4ifSwiaWF0IjoxNjIyNzY5OTc5fQ.ewt1WaANXP2lhg3FCRr3XS3jeFDz3i4HaCK4eG3-zQ4';
const userSample: User = {
  id: 3,
  username: 'Sehun',
  firstname: 'Yishan',
  lastname: 'Zhang',
  user_password: '$2b$10$IBsO/2GaGq6rduYi/fl2duh36NAlCwSYnhj1ePwFwoXHmyig05/FC',
};

describe('User Handler', () => {
  beforeAll(function () {
    spyOn(store, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 3,
          username: 'Sehun',
          firstname: 'Yishan',
          lastname: 'Zhang',
        },
        {
          id: 4,
          username: 'Jocelyn',
          firstname: 'Xinxin',
          lastname: 'Huang',
        },
        {
          id: 20,
          username: 'Thriller',
          firstname: 'Michael',
          lastname: 'Jackson',
        },
      ])
    );

    spyOn(store, 'show').and.returnValue(
      Promise.resolve({
        id: 20,
        username: 'Thriller',
        firstname: 'Michael',
        lastname: 'Jackson',
      })
    );

    spyOn(store, 'create').and.returnValue(Promise.resolve(userSample));

    spyOn(store, 'authenticate').and.returnValue(Promise.resolve(token));
  });

  it('index route should return a list of users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(store.index).toHaveBeenCalled;
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined;
  });

  it('show route should return records of userInfo and orderInfo by userId', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);

    expect(store.show).toHaveBeenCalledWith('1');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined;
  });

  it('create route should return a token', async () => {
    const response = await request.post('/createuser').send(userSample);
    expect(store.create).toHaveBeenCalledWith(userSample);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined;
  });

  it('authenticate route should return a successful reponse', async () => {
    const response = await request.post('/authenticate').send({
      username: 'Thriller',
      user_password: '234',
    });
    expect(store.authenticate).toHaveBeenCalledWith('Thriller', '234');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined;
  });
});
