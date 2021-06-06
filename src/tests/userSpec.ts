import { User, UserStore } from '../models/user';

const store = new UserStore();

describe('User Model', () => {
  it('index method should return a list of items', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it('show method should return a list of order records', async () => {
    const result = await store.show('1');
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it('create method should return an added user record', async () => {
    const result = await store.create({
      id: 27,
      username: 'Thriller',
      firstname: 'Michael',
      lastname: 'Jackson',
      user_password: '234',
    });
    expect(result).toBeDefined;
  });
  it('authenticate method should throw an error when user input is not valid', async () => {
    const result = await store.authenticate('Bene', '234');
    expect(result).toThrow(new Error('Invalid username, please try again.'));
  });
  it('authenticate method should return the password when user input is valid', async () => {
    const result = await store.authenticate('Jocelyn', '234');
    expect(result).toBeDefined;
  });
});
