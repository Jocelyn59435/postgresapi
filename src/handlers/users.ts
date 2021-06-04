import express, { Request, Response, NextFunction } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokensecret: string = process.env.TOKEN_SECRET!;

const store = new UserStore();

// express handler function
const create = async (req: Request, res: Response) => {
  const user: User = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    user_password: req.body.user_password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokensecret);
    console.log(`create user route. ${tokensecret}`);
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
    throw new Error(`Could not get users: ${err.detail}.`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
    console.log('Show user route.');
  } catch (err) {
    res.status(400);
    throw new Error(`Could not get user ${req.params.id}: ${err.detail}.`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const resultForauthentication = await store.authenticate(
      req.body.firstname,
      req.body.lastname,
      req.body.user_password
    );
    if (resultForauthentication) {
      const token = jwt.sign({ user: resultForauthentication }, tokensecret);
      res.json(token);
    } else {
      res.status(401).send('Invalid user info.');
    }
  } catch (err) {
    res.status(401);
    res.send(err);
  }
};

const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
): unknown => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).send('invalid request');
    }
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, tokensecret);
    next();
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

export { user_routes, verifyAuthToken };
