"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const products_1 = require("../handlers/products");
const request = supertest_1.default(server_1.default);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJmaXJzdG5hbWUiOiJaaXlpbiIsImxhc3RuYW1lIjoiWWFuZyIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkQXpUaU5ZYWR5U1dTOW5vOEVucGhULjJpSHJSNTQxWVNuQkhvakhVYTZvWUl0UmRjVnJrLy4ifSwiaWF0IjoxNjIyNzY5OTc5fQ.ewt1WaANXP2lhg3FCRr3XS3jeFDz3i4HaCK4eG3-zQ4';
const productSample = {
    id: 22,
    product_name: 'Belgian Chocolate Layer Cake 170g',
    product_price: 6,
    product_category: 'Backery',
};
describe('Product Handler', () => {
    beforeAll(function () {
        spyOn(products_1.store, 'index').and.returnValue(Promise.resolve([
            {
                id: 5,
                product_name: 'Nudie Nothing But Aloha Blend 400ml',
                product_price: 3,
                product_category: 'Drink',
            },
            {
                id: 10,
                product_name: 'Perfection Chinese Wombok Baby whole each',
                product_price: 3,
                product_category: 'Veggie',
            },
            {
                id: 15,
                product_name: 'Nestle Milo Cereal 700g',
                product_price: 7,
                product_category: 'Food',
            },
            {
                id: 16,
                product_name: 'Lindt Les Grandes Dark Hazelnut 150g',
                product_price: 5,
                product_category: 'Snack',
            },
        ]));
        spyOn(products_1.store, 'show').and.returnValue(Promise.resolve({
            id: 10,
            product_name: 'Perfection Chinese Wombok Baby whole each',
            product_price: 3,
            product_category: 'Veggie',
        }));
        spyOn(products_1.store, 'create').and.returnValue(Promise.resolve(productSample));
        spyOn(products_1.store, 'delete').and.returnValue(Promise.resolve('Product 22 is deleted.'));
    });
    it('index route should return a list of items', async () => {
        const response = await request.get('/products');
        const expectedResponse = [
            {
                id: 5,
                product_name: 'Nudie Nothing But Aloha Blend 400ml',
                product_price: 3,
                product_category: 'Drink',
            },
            {
                id: 10,
                product_name: 'Perfection Chinese Wombok Baby whole each',
                product_price: 3,
                product_category: 'Veggie',
            },
            {
                id: 15,
                product_name: 'Nestle Milo Cereal 700g',
                product_price: 7,
                product_category: 'Food',
            },
            {
                id: 16,
                product_name: 'Lindt Les Grandes Dark Hazelnut 150g',
                product_price: 5,
                product_category: 'Snack',
            },
        ];
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });
    it('show route should return a record of the product with id 10', async () => {
        const response = await request.get('/products/10');
        const expectedResponse = {
            id: 10,
            product_name: 'Perfection Chinese Wombok Baby whole each',
            product_price: 3,
            product_category: 'Veggie',
        };
        expect(products_1.store.show).toHaveBeenCalledWith('10');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });
    it('create route should return a record of the added product', async () => {
        const response = await request
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send(productSample);
        expect(products_1.store.create).toHaveBeenCalledWith(productSample);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(productSample);
    });
    it('delete route should return a successful reponse', async () => {
        const response = await request
            .delete('/deleteproduct/22')
            .set('Authorization', `Bearer ${token}`);
        const expectedResponse = 'Product 22 is deleted.';
        expect(products_1.store.delete).toHaveBeenCalledWith('22');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });
});
