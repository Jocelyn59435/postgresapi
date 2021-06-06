"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            console.log(result);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}.`);
        }
    }
    // show user info by id with most recent orders
    async show(id) {
        try {
            const sql = 'select user_id, orders.id as order_id, order_time, order_status, username, firstname, lastname, user_password from orders inner join users on orders.user_id = users.id and users.id = ($1) order by order_time DESC;';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (id, username, firstname, lastname, user_password) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.user_password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [
                u.id,
                u.username,
                u.firstname,
                u.lastname,
                hash,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            console.log(err.detail);
            throw new Error(`unable create user (${u.firstname} ${u.lastname}): ${err.detail}`);
        }
    }
    async authenticate(username, input_password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT user_password FROM users WHERE username = ($1)';
        const result = await conn.query(sql, [username]);
        console.log(result);
        if (result.rows.length) {
            const user_password = result.rows[0];
            console.log(user_password);
            if (bcrypt_1.default.compareSync(input_password + pepper, user_password.user_password)) {
                return user_password;
            }
            else {
                throw new Error('Wrong password, please try again.');
            }
        }
        throw new Error('Invalid username, please try again.');
    }
}
exports.UserStore = UserStore;
