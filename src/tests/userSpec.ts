import { User, UserStore } from '../models/user';

const store = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of items', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
