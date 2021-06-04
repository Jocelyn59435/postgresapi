import dotenv from 'dotenv';
import client from '../database';
import bcrypt from 'bcrypt';

dotenv.config();

const pepper: string = process.env.BCRYPT_PASSWORD!;
const saltRounds: string = process.env.SALT_ROUNDS!;

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  user_password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      console.log(result);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}.`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (id, firstname, lastname, user_password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(
        u.user_password + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [
        u.id,
        u.firstname,
        u.lastname,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      console.log(err.detail);
      throw new Error(
        `unable create user (${u.firstname} ${u.lastname}): ${err.detail}`
      );
    }
  }

  async authenticate(
    firstname: string,
    lastname: string,
    input_password: string
  ): Promise<User | null> {
    const conn = await client.connect();
    const sql =
      'SELECT user_password FROM users WHERE firstname = ($1) AND lastname = ($2)';
    const result = await conn.query(sql, [firstname, lastname]);
    if (result.rows.length) {
      const user_password = result.rows[0];
      console.log(user_password);

      if (
        bcrypt.compareSync(input_password + pepper, user_password.user_password)
      ) {
        return user_password;
      }
    }
    return null;
  }
}
