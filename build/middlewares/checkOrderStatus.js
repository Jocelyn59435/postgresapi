"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrderStatus = exports.orderStore = void 0;
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
exports.orderStore = store;
const checkOrderStatus = async (req, res, next) => {
    try {
        const order = await store.show(req.params.orderid);
        console.log(order);
        if (order.order_status !== 'active') {
            throw new Error(`Could not add product ${req.body.product_id} to order ${req.params.orderid} because order status is ${order.order_status}`);
        }
        next();
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
exports.checkOrderStatus = checkOrderStatus;
