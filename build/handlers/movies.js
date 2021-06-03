"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_1 = require("../models/movie");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokensecret = process.env.TOKEN_SECRET;
const store = new movie_1.MovieStore();
// express handler function
const index = async (_req, res) => {
    const movies = await store.index();
    res.json(movies);
    console.log(movies);
};
const show = async (req, res) => {
    try {
        const movie = await store.show(req.params.id);
        res.json(movie);
        console.log('show route');
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        // When verifying token, need to add token secret by JWT debugger
        jsonwebtoken_1.default.verify(token, tokensecret);
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    try {
        const movie = {
            id: req.body.id,
            title: req.body.title,
            duration: req.body.duration,
            director: req.body.director,
            type: req.body.type,
            summary: req.body.summary,
        };
        const newMovie = await store.create(movie);
        console.log('create route.');
        res.json(newMovie);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
};
const deleteMovie = async (req, res) => {
    try {
        const deleted = await store.delete(req.params.id);
        console.log('delete route.');
        console.log(req.params.id);
        res.json(deleted);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
};
const movie_routes = (app) => {
    app.get('/allmovies', index);
    app.get('/allmovies/:id', show);
    app.post('/allmovies', create);
    app.delete('/deletemovie/:id', deleteMovie);
};
exports.default = movie_routes;
