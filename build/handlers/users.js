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
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        user_password: req.body.user_password,
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, tokensecret);
        console.log(`create user route. ${tokensecret}`);
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
        res.json(users);
        console.log('Index user route.');
    }
    catch (err) {
        res.status(400);
        throw new Error(`Could not get users: ${err.detail}.`);
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
        throw new Error(`Could not get user ${req.params.id}: ${err.detail}.`);
    }
};
const authenticate = async (req, res) => {
    try {
        const resultForauthentication = await store.authenticate(req.body.firstname, req.body.lastname, req.body.user_password);
        if (resultForauthentication) {
            const token = jsonwebtoken_1.default.sign({ user: resultForauthentication }, tokensecret);
            res.json(token);
        }
        else {
            res.status(401).send('Invalid user info.');
        }
    }
    catch (err) {
        res.status(401);
        res.send(err);
    }
};
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).send('invalid request');
        }
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, tokensecret);
        next();
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
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
};
exports.default = user_routes;
