"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
describe('Order Model', () => {
    beforeAll(function () {
        spyOn(store, 'show').and.returnValue(Promise.resolve({
            id: 1,
            order_status: 'complete',
            order_time: new Date(Date.UTC(2021, 1)),
            user_id: '2',
        }));
        spyOn(store, 'create').and.returnValue(Promise.resolve({
            id: 1,
            order_status: 'complete',
            order_time: new Date(Date.UTC(2021, 1)),
            user_id: '2',
        }));
        spyOn(store, 'completedOrdersByUser').and.returnValue(Promise.resolve([
            {
                id: 1,
                order_status: 'complete',
                order_time: new Date(Date.UTC(2021, 1)),
                user_id: '2',
            },
            {
                id: 2,
                order_status: 'complete',
                order_time: new Date(Date.UTC(2021, 1)),
                user_id: '2',
            },
        ]));
        spyOn(store, 'showByUser').and.returnValue(Promise.resolve([
            {
                id: 1,
                order_status: 'complete',
                order_time: new Date(Date.UTC(2021, 1)),
                user_id: '2',
            },
            {
                id: 2,
                order_status: 'complete',
                order_time: new Date(Date.UTC(2021, 1)),
                user_id: '2',
            },
        ]));
        spyOn(store, 'addProduct').and.returnValue(Promise.resolve({
            id: 15,
            quantity: 2,
            order_id: 7,
            product_id: 3,
        }));
    });
    it('show method should return an order record', async () => {
        const result = await store.show('2');
        expect(result).toBeDefined;
    });
    it('create method should return an added order record', async () => {
        const result = await store.create({
            id: 1,
            order_status: 'Complete',
            order_time: new Date(Date.UTC(2021, 1)),
            user_id: '2',
        });
        expect(result).toBeDefined;
    });
    it('completedOrderByUser method will show a list of order records according to input user id', async () => {
        const result = await store.completedOrdersByUser('2');
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('showByUser method will show a list of order records according to input user id', async () => {
        const result = await store.completedOrdersByUser('2');
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('add product method should return an added record', async () => {
        const result = await store.addProduct(2, '7', '3');
        expect(result).toBeDefined;
    });
});
