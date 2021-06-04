import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyAuthToken } from './users';
import dotenv from 'dotenv';

dotenv.config();

const store = new ProductStore();

// express handler function
const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    console.log(products);
    res.json(products);
    console.log('Index product route.');
  } catch (err) {
    res.status(400);
    throw new Error(`Could not get products: ${err.detail}.`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
    console.log('Show product route');
  } catch (err) {
    res.status(400);
    throw new Error(`Could not get product ${req.params.id}: ${err.detail}.`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: req.body.id,
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_category: req.body.product_category,
    };

    const newproduct = await store.create(product);
    console.log('Create product route.');
    res.json(newproduct);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err.message);
  }
};

const deleteproduct = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    console.log('delete product route.');
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err.message);
  }
};

const product_routes = (app: express.Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.delete('/deleteproduct/:id', verifyAuthToken, deleteproduct);
};

export default product_routes;
