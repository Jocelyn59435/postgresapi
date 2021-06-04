import { Request, Response, NextFunction } from 'express';
import { OrderStore } from '../models/order';

const store = new OrderStore();

const checkOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await store.show(req.params.orderid);
    console.log(order);
    if (order.order_status !== 'active') {
      throw new Error(
        `Could not add product ${req.body.product_id} to order ${req.params.orderid} because order status is ${order.order_status}`
      );
    }
    next();
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

export default checkOrderStatus;
