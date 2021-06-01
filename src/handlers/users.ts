import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

// express handler function
const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: req.body.id,
      username: req.body['username'],
      password_digest: req.body['password_digest'],
    };
    const newUser = await store.create(user);
    console.log('create route.');
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(req.body.username, req.body.password);
    if (user) {
      res.json(user);
    } else {
      res.send('The user input is not validate.');
    }
  } catch (err) {
    console.log(err);
  }
};

const user_routes = (app: express.Application) => {
  app.post('/createuser', create);
  app.post('/checkuser', authenticate);
};

export default user_routes;
