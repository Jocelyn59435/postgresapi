"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieStore = void 0;
const database_1 = __importDefault(require("../database"));
class MovieStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM movies';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get movies. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM movies WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`);
        }
    }
    async create(m) {
        try {
            const sql = 'INSERT INTO movies (title, duration, director, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING *';
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [
                m.title,
                m.duration,
                m.director,
                m.type,
                m.summary,
            ]);
            const movie = result.rows[0];
            conn.release();
            return movie;
        }
        catch (err) {
            throw new Error(`Could not add new movie ${m.title}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM books WHERE id=($1)';
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const movie = result.rows[0];
            conn.release();
            return movie;
        }
        catch (err) {
            throw new Error(`Could not delete movie ${id}. Error: ${err}`);
        }
    }
}
exports.MovieStore = MovieStore;
