import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import { checkOrderStatus } from '../middlewares/checkOrderStatus';
import dotenv from 'dotenv';

dotenv.config();

const store = new OrderStore();

// express handler function
const completedOrdersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.completedOrdersByUser(req.params.userid);
    console.log(orders);
    res.json(orders);
    console.log('Show completed order by user.');
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const showByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.showByUser(req.params.userid);
    res.json(orders);
    console.log('Show order by user.');
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const orders = await store.showByUser(req.params.id);
    res.json(orders);
    console.log('Show order by order id.');
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: req.body.id,
      order_status: req.body.order_status,
      user_id: req.body.user_id,
    };

    const neworder = await store.create(order);
    console.log('Create order route.');
    res.json(neworder);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err.message);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const order_id: string = req.params.orderid;
  const product_id: string = req.body.product_id;
  const quantity: number = req.body.quantity;
  try {
    const addedInfo = await store.addProduct(quantity, order_id, product_id);
    res.json(addedInfo);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const order_routes = (app: express.Application): void => {
  app.get('/completedorders/:userid', verifyAuthToken, completedOrdersByUser);
  app.get('/orders/:id', verifyAuthToken, show);
  app.get('/orders/users/:userid', verifyAuthToken, showByUser);
  app.post('/orders', verifyAuthToken, create);
  app.post(
    '/orders/:orderid/products',
    verifyAuthToken,
    checkOrderStatus,
    addProduct
  );
};

export { store, order_routes };
