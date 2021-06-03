"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokensecret = process.env.TOKEN_SECRET;
const store = new user_1.UserStore();
// express handler function
const create = async (req, res) => {
    const user = {
        username: req.body['username'],
        password_digest: req.body['password_digest'],
    };
    try {
        const newUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, tokensecret);
        console.log('create route.');
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    const user = {
        username: req.body['username'],
        password_digest: req.body['password_digest'],
    };
    try {
        const u = await store.authenticate(req.body.username, req.body.password);
        var token = jsonwebtoken_1.default.sign({ user: u }, tokensecret);
        res.json(token);
    }
    catch (err) {
        console.log(err);
        res.status(401);
        res.json({ err });
    }
};
const user_routes = (app) => {
    app.post('/createuser', create);
    app.post('/checkuser', authenticate);
};
exports.default = user_routes;
