import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { verifyAuthToken } from './users';
import dotenv from 'dotenv';

dotenv.config();

const store = new OrderStore();

// express handler function
const completedOrdersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.completedOrdersByUser(req.params.id);
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
    const orders = await store.showByUser(req.params.id);
    res.json(orders);
    console.log('Show order by user.');
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
      order_time: req.body.order_time,
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

const order_routes = (app: express.Application): void => {
  app.get('/completedorders/:userid', verifyAuthToken, completedOrdersByUser);
  app.get('/orders/:userid', verifyAuthToken, showByUser);
  app.post('/orders', verifyAuthToken, create);
};

export default order_routes;
