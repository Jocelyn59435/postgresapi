"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_routes = exports.store = void 0;
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
const checkOrderStatus_1 = __importDefault(require("../middlewares/checkOrderStatus"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new order_1.OrderStore();
exports.store = store;
// express handler function
const completedOrdersByUser = async (req, res) => {
    try {
        const orders = await store.completedOrdersByUser(req.params.userid);
        console.log(orders);
        res.json(orders);
        console.log('Show completed order by user.');
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const showByUser = async (req, res) => {
    try {
        const orders = await store.showByUser(req.params.userid);
        res.json(orders);
        console.log('Show order by user.');
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const create = async (req, res) => {
    try {
        const order = {
            id: req.body.id,
            order_status: req.body.order_status,
            order_time: req.body.order_time,
            user_id: req.body.user_id,
        };
        const neworder = await store.create(order);
        console.log('Create order route.');
        res.json(neworder);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err.message);
    }
};
const addProduct = async (req, res) => {
    const order_id = req.params.orderid;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    try {
        const addedInfo = await store.addProduct(quantity, order_id, product_id);
        res.json(addedInfo);
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const order_routes = (app) => {
    app.get('/completedorders/:userid', verifyAuthToken_1.default, completedOrdersByUser);
    app.get('/orders/:userid', verifyAuthToken_1.default, showByUser);
    app.post('/orders', verifyAuthToken_1.default, create);
    app.post('/orders/:orderid/products', verifyAuthToken_1.default, checkOrderStatus_1.default, addProduct);
};
exports.order_routes = order_routes;
