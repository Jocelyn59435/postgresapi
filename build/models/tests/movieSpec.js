"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movie_1 = require("../movie");
const store = new movie_1.MovieStore();
describe('Movie Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('index method should return a list of items', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
