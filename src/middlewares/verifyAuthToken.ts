import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokensecret: string = process.env.TOKEN_SECRET!;

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

export default verifyAuthToken;
