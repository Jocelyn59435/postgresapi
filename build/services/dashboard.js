"use strict";
// SELECT product_name, count(DISTINCT order_id) as orders FROM products INNER JOIN order_products ON products.id = order_products.product_id
// GROUP BY product_name ORDER BY orders DESC LIMIT 5;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    // get TOP 5 popular product by counting and sorting unique order_id for each prodcut
    async topFiveProducts() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT product_name, count(DISTINCT order_id) as orders FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY product_name ORDER BY orders DESC LIMIT 5';
            const result = await conn.query(sql);
            console.log(result);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable get top five products: ${err}`);
        }
    }
    async productsByCategory(category) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * from products where product_category =($1::text)';
            const result = await conn.query(sql, [category]);
            console.log(result);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`unable get products by ${category}: ${err}`);
        }
    }
    async getPurchaseInfoByOrderId(order_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select product_name, product_price, product_category, quantity, order_id from products inner join order_products on products.id = order_products.product_id where order_id = ($1)';
            const result = await conn.query(sql, [order_id]);
            console.log(result);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable get order Info by ${order_id}: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
