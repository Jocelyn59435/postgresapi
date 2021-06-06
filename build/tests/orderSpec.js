"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
describe('Order Model', () => {
    it('show method should return an order record', async () => {
        const result = await store.show('1');
        expect(result).toBeDefined;
    });
    it('create method should return an added order record', async () => {
        const result = await store.create({
            id: 32,
            order_status: 'Active',
            order_time: new Date(Date.now()),
            user_id: '4',
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
        const result = await store.addProduct(9, '4', '27');
        expect(result).toBeDefined;
    });
});
