import { Router } from 'express';
import authController from './app/auth/auth.controller';
import moviesController from './app/movies/movies.controller';

const api = Router().use(moviesController);

// prettier-ignore
export default Router()
  .use('/api/auth', authController)
  .use('/api', api);
