import { query } from 'express-validator';
import { MovieType } from '../models/movie';
import { MoviePlotType } from '../models/movie.specification';

const MOVIE_TYPES = Object.values(MovieType);
const MOVIE_PLOT_TYPES = Object.values(MoviePlotType);
const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear() + 100;

export default [
  query('t').exists().withMessage('must provide a title'),
  query('type')
    .optional()
    .isIn(MOVIE_TYPES)
    .withMessage(`type must be ${MOVIE_TYPES.join('|')}`),
  query('y')
    .optional()
    .isInt({ min: MIN_YEAR, max: MAX_YEAR })
    .withMessage('must provide a valid year'),
  query('plot')
    .optional()
    .isIn(MOVIE_PLOT_TYPES)
    .withMessage(`plot must be ${MOVIE_PLOT_TYPES.join('|')}`),
];
