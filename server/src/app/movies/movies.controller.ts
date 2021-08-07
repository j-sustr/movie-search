import { Request, Response, Router } from 'express';
import logger from '../../common/logger';
import { validateRequestSchema } from '../../common/middleware/validate-request-schema.middleware';
import { MovieType } from './models/movie';
import { MoviePlotType } from './models/movie.specification';
import { MoviesService } from './movies.service';
import moviesSearchSchema from './schemas/movie-search.schema';

const moviesService = new MoviesService();
const router = Router();

router.get(
  '/movies/search',
  moviesSearchSchema,
  validateRequestSchema,
  (req: Request, res: Response) => {
    const title = req.query.t as string;
    const type = req.query.type as MovieType | undefined;
    const releaseYear = req.query.y
      ? parseInt(req.query.y as string)
      : undefined;
    const plot = req.query.plot as MoviePlotType | undefined;

    moviesService
      .find({
        title,
        type,
        releaseYear,
        plot,
      })
      .then((movies) => res.json(movies))
      .catch((err) => {
        logger.error('MoviesService.find error: ' + err);
        res.status(500);
      });
  }
);

export default router;
