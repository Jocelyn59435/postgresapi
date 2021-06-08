"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = exports.queries = void 0;
const verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
const dashboard_1 = require("../services/dashboard");
const queries = new dashboard_1.DashboardQueries();
exports.queries = queries;
const topFiveProducts = async (_req, res) => {
    try {
        const result = await queries.topFiveProducts();
        console.log(result);
        res.json(result);
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const productsByCategory = async (req, res) => {
    try {
        const result = await queries.productsByCategory(req.params.category);
        console.log(result);
        res.json(result);
    }
    catch (err) {
        console.log(req.params.category);
        res.status(400);
        res.json(err.message);
    }
};
const getPurchaseInfoByOrderId = async (req, res) => {
    try {
        const result = await queries.getPurchaseInfoByOrderId(req.params.orderid);
        console.log(result);
        res.json(result);
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const dashboardRoutes = (app) => {
    app.get('/topfiveproducts', topFiveProducts);
    app.get('/productsbycategory/:category', productsByCategory);
    app.get('/purchaseinfo/:orderid', verifyAuthToken_1.default, getPurchaseInfoByOrderId);
};
exports.dashboardRoutes = dashboardRoutes;
