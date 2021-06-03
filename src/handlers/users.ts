import express, { Request, Response } from 'express';
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
    console.log('create route.');
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    user_password: req.body.user_password,
  };
  try {
    const u = await store.authenticate(user.firstname, user.user_password);
    const token = jwt.sign({ user: u }, tokensecret);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(401);
    res.json({ err });
  }
};

const user_routes = (app: express.Application): void => {
  app.post('/createuser', create);
  app.post('/checkuser', authenticate);
};

export default user_routes;
