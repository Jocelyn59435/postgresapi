"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboards_1 = require("../handlers/dashboards");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = supertest_1.default(server_1.default);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJmaXJzdG5hbWUiOiJaaXlpbiIsImxhc3RuYW1lIjoiWWFuZyIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkQXpUaU5ZYWR5U1dTOW5vOEVucGhULjJpSHJSNTQxWVNuQkhvakhVYTZvWUl0UmRjVnJrLy4ifSwiaWF0IjoxNjIyNzY5OTc5fQ.ewt1WaANXP2lhg3FCRr3XS3jeFDz3i4HaCK4eG3-zQ4';
describe('Dashboard Service', () => {
    beforeAll(function () {
        spyOn(dashboards_1.queries, 'topFiveProducts').and.returnValue(Promise.resolve([
            {
                product_name: 'Nestle Milo Cereal 700g',
                orders: '3',
            },
            {
                product_name: 'Nudie Nothing But Aloha Blend 400ml',
                orders: '3',
            },
            {
                product_name: 'Fresh Strawberry 250g',
                orders: '2',
            },
            {
                product_name: 'Kiwi Fruit Gold 500g punnet',
                orders: '1',
            },
            {
                product_name: 'H2coco 100% Natural Pure Coconut Water 1l',
                orders: '1',
            },
        ]));
        spyOn(dashboards_1.queries, 'productsByCategory').and.returnValue(Promise.resolve([
            {
                id: 15,
                product_name: 'Nestle Milo Cereal 700g',
                product_price: 7,
                product_category: 'Food',
            },
            {
                id: 6,
                product_name: 'Tu Bao Zi Flaky Scallion Pancake 480g',
                product_price: 4,
                product_category: 'Food',
            },
            {
                id: 7,
                product_name: 'Spam Ham Lite 340g',
                product_price: 3,
                product_category: 'Food',
            },
        ]));
        spyOn(dashboards_1.queries, 'getPurchaseInfoByOrderId').and.returnValue(Promise.resolve([
            {
                product_name: 'H2coco 100% Natural Pure Coconut Water 1l',
                product_price: 4,
                product_category: 'Drink',
                quantity: 6,
                order_id: 7,
            },
            {
                product_name: 'Nudie Nothing But Aloha Blend 400ml',
                product_price: 3,
                product_category: 'Drink',
                quantity: 2,
                order_id: 7,
            },
            {
                product_name: 'Nestle Milo Cereal 700g',
                product_price: 7,
                product_category: 'Food',
                quantity: 2,
                order_id: 7,
            },
            {
                product_name: 'Fresh Strawberry 250g',
                product_price: 5,
                product_category: 'Fruit',
                quantity: 2,
                order_id: 7,
            },
            {
                product_name: 'Kiwi Fruit Gold 500g punnet',
                product_price: 6,
                product_category: 'Fruit',
                quantity: 2,
                order_id: 7,
            },
        ]));
    });
    it('topFiveProducts route should return a list of 5 most popular products', async () => {
        const response = await request.get('/topfiveproducts');
        expect(dashboards_1.queries.topFiveProducts).toHaveBeenCalled;
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined;
    });
    it('productsByCategory route should return a list of food product', async () => {
        const response = await request.get('/productsbycategory/Food');
        expect(dashboards_1.queries.productsByCategory).toHaveBeenCalledWith('Food');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined;
    });
    it('getPurchaseInfoByOderId route shoud return purchase info by order id', async () => {
        const response = await request
            .get('/purchaseinfo/7')
            .set('Authorization', `Bearer ${token}`);
        expect(dashboards_1.queries.getPurchaseInfoByOrderId).toHaveBeenCalledWith('7');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined;
    });
});
