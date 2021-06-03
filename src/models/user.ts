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
      throw new Error(
        `unable create user (${u.firstname} ${u.lastname}): ${err}`
      );
    }
  }

  async authenticate(
    firstname: string,
    password: string
  ): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT user_password FROM users WHERE firstname=($1)';

    const result = await conn.query(sql, [firstname]);
    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }
}
