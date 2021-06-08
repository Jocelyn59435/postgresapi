"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_routes = exports.store = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
dotenv_1.default.config();
const tokensecret = process.env.TOKEN_SECRET;
const store = new user_1.UserStore();
exports.store = store;
// express handler function
const create = async (req, res) => {
    const user = {
        id: req.body.id,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        user_password: req.body.user_password,
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, tokensecret);
        console.log('create user route.');
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const index = async (_req, res) => {
    try {
        const users = await store.index();
        console.log(users);
        res.json(users);
        console.log('Index user route.');
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
        console.log('Show user route.');
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const authenticate = async (req, res) => {
    try {
        const resultForauthentication = await store.authenticate(req.body.username, req.body.user_password);
        if (resultForauthentication) {
            const token = jsonwebtoken_1.default.sign({ user: resultForauthentication }, tokensecret);
            res.json(token);
        }
        else {
            res.status(401).send('No authentication.');
        }
    }
    catch (err) {
        res.status(401);
        res.send(err);
    }
};
const user_routes = (app) => {
    app.post('/authenticate', authenticate);
    app.post('/createuser', create);
    // provide your-256-bit-secret field in JWT debugger for testing
    app.get('/users', verifyAuthToken_1.default, index);
    app.get('/users/:id', verifyAuthToken_1.default, show);
};
exports.user_routes = user_routes;
