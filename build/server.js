"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = require("./handlers/users");
const app = express_1.default();
const address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
products_1.default(app);
users_1.user_routes(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
