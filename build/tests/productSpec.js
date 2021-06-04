"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('index method should return a list of items', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
});
