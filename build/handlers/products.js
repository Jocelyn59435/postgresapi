"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const dotenv_1 = __importDefault(require("dotenv"));
const verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
dotenv_1.default.config();
const store = new product_1.ProductStore();
// express handler function
const index = async (_req, res) => {
    try {
        const products = await store.index();
        console.log(products);
        res.json(products);
        console.log('Index product route.');
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
        console.log('Show product route');
    }
    catch (err) {
        res
            .status(400)
            .send(`Could not get product ${req.params.id}: ${err.message}`);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            id: req.body.id,
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_category: req.body.product_category,
        };
        const newproduct = await store.create(product);
        console.log('Create product route.');
        res.json(newproduct);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err.message);
    }
};
const deleteproduct = async (req, res) => {
    try {
        const deleted = await store.delete(req.params.id);
        console.log('delete product route.');
        res.json(deleted);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err.message);
    }
};
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken_1.default, create);
    app.delete('/deleteproduct/:id', verifyAuthToken_1.default, deleteproduct);
};
exports.default = product_routes;
