import express, { Request, Response } from 'express';
import { Movie, MovieStore } from '../models/movie';

const store = new MovieStore();

// express handler function
const index = async (_req: Request, res: Response) => {
  const movies = await store.index();
  res.json(movies);
  console.log(movies);
};

const show = async (req: Request, res: Response) => {
  try {
    const movie = await store.show(req.body.id);
    res.json(movie);
    console.log('show route');
    console.log(req.body.id);
  } catch (err) {
    console.log(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const movie: Movie = {
      id: req.body.id,
      title: req.body.title,
      duration: req.body.duration,
      director: req.body.director,
      type: req.body.type,
      summary: req.body.summary,
    };
    const newMovie = await store.create(movie);
    console.log('create route.');
    res.json(newMovie);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const movie_routes = (app: express.Application) => {
  app.get('/allmovies', index);
  app.get('/allmovies/:id', show);
  app.post('/allmovies', create);
  app.delete('/deletemovie/:id', deleteMovie);
};

export default movie_routes;
