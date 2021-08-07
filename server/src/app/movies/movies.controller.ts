import { Router, Request, Response } from 'express';
import { MovieType } from './models/movie';
import { MoviePlotType } from './models/movie.specification';
import { MoviesService } from './movies.service';

const moviesService = new MoviesService();
const router = Router();

router.get('/movies/search', (req: Request, res: Response) => {
  const title = req.query.t as string;
  const type = req.query.type as MovieType | undefined;
  const releaseYear = req.query.y ? parseInt(req.query.y as string) : undefined;
  const plot = req.query.plot as MoviePlotType | undefined;

  moviesService
    .find({
      title,
      type,
      releaseYear,
      plot,
    })
    .then((movies) => res.json(movies))
    .catch(() => {
      res.status(500);
    });
});

export default router;
