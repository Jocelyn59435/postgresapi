"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const queries = new dashboard_1.DashboardQueries();
describe('Dashboard Service', () => {
    beforeAll(function () {
        spyOn(queries, 'topFiveProducts').and.returnValue(Promise.resolve([
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
        spyOn(queries, 'productsByCategory').and.returnValue(Promise.resolve([
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
        spyOn(queries, 'getPurchaseInfoByOrderId').and.returnValue(Promise.resolve([
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
    it('topFiveProducts should return a list of 5 most popular products', async () => {
        const result = await queries.topFiveProducts();
        expect(result.length).toEqual(5);
    });
    it('productsByCategory should return a list of food product', async () => {
        const result = await queries.productsByCategory('Food');
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('getPurchaseInfoByOderId shoud return purchase info by order id', async () => {
        const result = await queries.getPurchaseInfoByOrderId('7');
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
});
