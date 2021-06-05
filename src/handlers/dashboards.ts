import express, { Request, Response } from 'express';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import { DashboardQueries } from '../services/dashboard';

const queries = new DashboardQueries();

const topFiveProducts = async (_req: Request, res: Response) => {
  try {
    const result = await queries.topFiveProducts();
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const productsByCategory = async (req: Request, res: Response) => {
  try {
    const result = await queries.productsByCategory(req.params.category);
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(req.params.category);
    res.status(400);
    res.json(err.message);
  }
};

const getPurchaseInfoByOrderId = async (req: Request, res: Response) => {
  try {
    const result = await queries.getPurchaseInfoByOrderId(req.params.orderid);
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const dashboardRoutes = (app: express.Application): void => {
  app.get('/topfiveproducts', topFiveProducts);
  app.get('/products/:category', productsByCategory);
  app.get('/purchaseinfo/:orderid', verifyAuthToken, getPurchaseInfoByOrderId);
};

export default dashboardRoutes;
