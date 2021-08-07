import { Router } from 'express';
import moviesController from './app/movies/movies.controller';

const api = Router().use(moviesController);

// prettier-ignore
export default Router()
  .use('/api', api);
