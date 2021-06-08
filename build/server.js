"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("./handlers/products");
const users_1 = require("./handlers/users");
const orders_1 = require("./handlers/orders");
const dashboards_1 = require("./handlers/dashboards");
const app = express_1.default();
const address = '0.0.0.0:5000';
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('Welcome to the grocery.');
});
products_1.product_routes(app);
users_1.user_routes(app);
orders_1.order_routes(app);
dashboards_1.dashboardRoutes(app);
app.listen(5000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
