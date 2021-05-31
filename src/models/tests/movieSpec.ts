import { Movie, MovieStore } from '../movie';

const store = new MovieStore();

describe('Movie Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of items', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
