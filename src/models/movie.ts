import client from '../database';

export type Movie = {
  id: Number;
  title: string;
  duration: number;
  director: string;
  type: string;
  summary: string;
};

export class MovieStore {
  async index(): Promise<Movie[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM movies';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get movies. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Movie> {
    try {
      const sql = 'SELECT * FROM movies WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }

  async create(m: Movie): Promise<Movie> {
    try {
      const sql =
        'INSERT INTO movies (title, duration, director, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();

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
    } catch (err) {
      throw new Error(`Could not add new movie ${m.title}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Movie> {
    try {
      const sql = 'DELETE FROM movies WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const movie = result.rows[0];

      conn.release();

      return movie;
    } catch (err) {
      throw new Error(`Could not delete movie ${id}. Error: ${err}`);
    }
  }
}
