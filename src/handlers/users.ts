import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../middlewares/verifyAuthToken';

dotenv.config();

const tokensecret: string = process.env.TOKEN_SECRET!;

const store = new UserStore();

// express handler function
const create = async (req: Request, res: Response) => {
  const user: User = {
    id: req.body.id,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    user_password: req.body.user_password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokensecret);
    console.log('create user route.');
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    console.log(users);
    res.json(users);
    console.log('Index user route.');
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
    console.log('Show user route.');
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const resultForauthentication = await store.authenticate(
      req.body.username,
      req.body.user_password
    );
    if (resultForauthentication) {
      const token = jwt.sign({ user: resultForauthentication }, tokensecret);
      res.json(token);
    } else {
      res.status(401).send('No authentication.');
    }
  } catch (err) {
    res.status(401);
    res.send(err);
  }
};

const user_routes = (app: express.Application): void => {
  app.post('/authenticate', authenticate);
  app.post('/createuser', create);
  // provide your-256-bit-secret field in JWT debugger for testing
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
};

export default user_routes;
