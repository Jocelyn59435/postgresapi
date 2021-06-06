import client from '../database';

export type Product = {
  id: number;
  product_name: string;
  product_price: number;
  product_category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows[0]) {
        return result.rows[0];
      } else {
        throw new Error(`No records for product ${id}.`);
      }
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (id, product_name, product_price, product_category) VALUES($1, $2, $3, $4) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [
        p.id,
        p.product_name,
        p.product_price,
        p.product_category,
      ]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(
        `Could not add new product ${p.product_name}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      if (result.rowCount === 0) {
        throw new Error('No product found to delete.');
      } else {
        conn.release();
        return `Product ${id} is deleted.`;
      }
    } catch (err) {
      throw new Error(`Could not delete product ${id}. ${err}`);
    }
  }
}
