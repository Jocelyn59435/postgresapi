import client from '../database';

export type Order = {
  id: number;
  order_status: string;
  order_time: Date;
  user_id: string;
};

export class OrderStore {
  async completedOrdersByUser(user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT * FROM orders WHERE (user_id = ($1) AND order_status = complete)';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async showByUser(user_id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find order with user_id ${user_id}. Error: ${err}`
      );
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (id, order_status, order_time, user_id) VALUES($1, $2, $3, $4) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [
        o.id,
        o.order_status,
        o.order_time,
        o.user_id,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${o.id}. Error: ${err}`);
    }
  }
}
